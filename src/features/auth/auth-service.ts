import { generarSalt, hashClave } from './hash';
import type { Usuario, UsuarioRepository } from './auth-repository';

export const CLAVE_MIN_LENGTH = 8;
export const MENSAJE_CREDENCIALES = 'Correo o clave incorrectos';

export type ResultadoAuth =
  { ok: true; usuario: Usuario } | { ok: false; error: string };

export type DatosRegistro = { nombre: string; correo: string; clave: string };
export type DatosLogin = { correo: string; clave: string };

const CORREO_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizarCorreo(correo: string): string {
  return correo.trim().toLowerCase();
}

export function validarRegistro(datos: DatosRegistro): string | null {
  if (datos.nombre.trim() === '') {
    return 'Ingresa tu nombre';
  }
  if (!CORREO_REGEX.test(normalizarCorreo(datos.correo))) {
    return 'Ingresa un correo válido';
  }
  if (datos.clave.length < CLAVE_MIN_LENGTH) {
    return `La clave debe tener al menos ${CLAVE_MIN_LENGTH} caracteres`;
  }
  return null;
}

export async function registrarUsuario(
  repo: UsuarioRepository,
  datos: DatosRegistro,
): Promise<ResultadoAuth> {
  const errorValidacion = validarRegistro(datos);
  if (errorValidacion) {
    return { ok: false, error: errorValidacion };
  }

  const correo = normalizarCorreo(datos.correo);
  if (await repo.buscarPorCorreo(correo)) {
    return { ok: false, error: 'Ya existe una cuenta con ese correo' };
  }

  const salt = await generarSalt();
  const claveHash = await hashClave(salt, datos.clave);
  const usuario = await repo.crear({
    nombre: datos.nombre.trim(),
    correo,
    claveHash,
    salt,
  });
  await repo.guardarSesion(usuario.id);
  return { ok: true, usuario };
}

export async function iniciarSesionUsuario(
  repo: UsuarioRepository,
  datos: DatosLogin,
): Promise<ResultadoAuth> {
  const encontrado = await repo.buscarPorCorreo(normalizarCorreo(datos.correo));
  if (!encontrado) {
    return { ok: false, error: MENSAJE_CREDENCIALES };
  }

  const claveHash = await hashClave(encontrado.salt, datos.clave);
  if (claveHash !== encontrado.claveHash) {
    return { ok: false, error: MENSAJE_CREDENCIALES };
  }

  await repo.guardarSesion(encontrado.id);
  return {
    ok: true,
    usuario: {
      id: encontrado.id,
      nombre: encontrado.nombre,
      correo: encontrado.correo,
    },
  };
}
