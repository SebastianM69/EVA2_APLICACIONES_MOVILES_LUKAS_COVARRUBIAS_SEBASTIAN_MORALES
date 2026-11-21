import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import type { UsuarioConClave, UsuarioRepository } from './auth-repository';
import {
  MENSAJE_CREDENCIALES,
  iniciarSesionUsuario,
  registrarUsuario,
} from './auth-service';

jest.mock('expo-crypto', () => ({
  CryptoDigestAlgorithm: { SHA256: 'SHA-256' },
  digestStringAsync: async (_algorithm: string, data: string) => {
    let hash = 0;
    for (const char of data) {
      hash = (Math.imul(hash, 31) + char.charCodeAt(0)) >>> 0;
    }
    return hash.toString(16).padStart(8, '0').repeat(8);
  },
  getRandomBytesAsync: async (byteCount: number) =>
    Uint8Array.from({ length: byteCount }, () =>
      Math.floor(Math.random() * 256),
    ),
}));

type RepoEnMemoria = UsuarioRepository & { filas: UsuarioConClave[] };

function crearRepoEnMemoria(): RepoEnMemoria {
  const filas: UsuarioConClave[] = [];
  let sesionUsuarioId: number | null = null;

  return {
    filas,
    async buscarPorCorreo(correo) {
      return filas.find((fila) => fila.correo === correo) ?? null;
    },
    async crear(usuario) {
      const fila = { id: filas.length + 1, ...usuario };
      filas.push(fila);
      return { id: fila.id, nombre: fila.nombre, correo: fila.correo };
    },
    async obtenerSesion() {
      const fila = filas.find((item) => item.id === sesionUsuarioId);
      return fila
        ? { id: fila.id, nombre: fila.nombre, correo: fila.correo }
        : null;
    },
    async guardarSesion(usuarioId) {
      sesionUsuarioId = usuarioId;
    },
    async eliminarSesion() {
      sesionUsuarioId = null;
    },
  };
}

describe('registrarUsuario', () => {
  let repo: RepoEnMemoria;

  beforeEach(() => {
    repo = crearRepoEnMemoria();
  });

  it('guarda solo el hash de la clave, nunca la clave en claro', async () => {
    const resultado = await registrarUsuario(repo, {
      nombre: 'Ana',
      correo: 'ana@correo.cl',
      clave: 'clave1234',
    });

    expect(resultado.ok).toBe(true);
    expect(repo.filas).toHaveLength(1);
    expect(repo.filas[0].claveHash).not.toContain('clave1234');
    expect(repo.filas[0].claveHash).not.toBe('clave1234');
  });

  it('CP-AUTH-02: correo existente devuelve error, también con mayúsculas distintas', async () => {
    await registrarUsuario(repo, {
      nombre: 'Ana',
      correo: 'ana@correo.cl',
      clave: 'clave1234',
    });

    const resultado = await registrarUsuario(repo, {
      nombre: 'Otra',
      correo: 'ANA@correo.cl',
      clave: 'otraClave99',
    });

    expect(resultado).toEqual({
      ok: false,
      error: 'Ya existe una cuenta con ese correo',
    });
    expect(repo.filas).toHaveLength(1);
  });

  it('rechaza claves de menos de 8 caracteres sin insertar fila', async () => {
    const resultado = await registrarUsuario(repo, {
      nombre: 'Ana',
      correo: 'ana@correo.cl',
      clave: 'corta',
    });

    expect(resultado.ok).toBe(false);
    expect(repo.filas).toHaveLength(0);
  });
});

describe('iniciarSesionUsuario', () => {
  let repo: RepoEnMemoria;

  beforeEach(async () => {
    repo = crearRepoEnMemoria();
    await registrarUsuario(repo, {
      nombre: 'Ana',
      correo: 'ana@correo.cl',
      clave: 'clave1234',
    });
    await repo.eliminarSesion();
  });

  it('CP-AUTH-03: clave incorrecta devuelve mensaje genérico y no guarda sesión', async () => {
    const resultado = await iniciarSesionUsuario(repo, {
      correo: 'ana@correo.cl',
      clave: 'claveMala',
    });

    expect(resultado).toEqual({ ok: false, error: MENSAJE_CREDENCIALES });
    expect(await repo.obtenerSesion()).toBeNull();
  });

  it('correo inexistente devuelve el mismo mensaje genérico', async () => {
    const resultado = await iniciarSesionUsuario(repo, {
      correo: 'nadie@correo.cl',
      clave: 'clave1234',
    });

    expect(resultado).toEqual({ ok: false, error: MENSAJE_CREDENCIALES });
  });

  it('credenciales correctas inician sesión con el usuario correcto', async () => {
    const resultado = await iniciarSesionUsuario(repo, {
      correo: ' ANA@correo.cl ',
      clave: 'clave1234',
    });

    expect(resultado).toEqual({
      ok: true,
      usuario: { id: 1, nombre: 'Ana', correo: 'ana@correo.cl' },
    });
    expect(await repo.obtenerSesion()).toEqual({
      id: 1,
      nombre: 'Ana',
      correo: 'ana@correo.cl',
    });
  });
});
