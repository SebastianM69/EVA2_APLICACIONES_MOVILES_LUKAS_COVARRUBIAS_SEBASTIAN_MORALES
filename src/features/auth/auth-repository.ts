import type { SQLiteDatabase } from 'expo-sqlite';

export type Usuario = {
  id: number;
  nombre: string;
  correo: string;
};

export type UsuarioConClave = Usuario & {
  claveHash: string;
  salt: string;
};

export type UsuarioNuevo = Omit<UsuarioConClave, 'id'>;

export type UsuarioRepository = {
  buscarPorCorreo(correo: string): Promise<UsuarioConClave | null>;
  crear(usuario: UsuarioNuevo): Promise<Usuario>;
  obtenerSesion(): Promise<Usuario | null>;
  guardarSesion(usuarioId: number): Promise<void>;
  eliminarSesion(): Promise<void>;
};

type FilaUsuarioConClave = {
  id: number;
  nombre: string;
  correo: string;
  clave_hash: string;
  salt: string;
};

export function crearUsuarioRepository(db: SQLiteDatabase): UsuarioRepository {
  return {
    async buscarPorCorreo(correo) {
      const fila = await db.getFirstAsync<FilaUsuarioConClave>(
        'SELECT id, nombre, correo, clave_hash, salt FROM usuarios WHERE correo = ?',
        correo,
      );
      if (!fila) {
        return null;
      }
      return {
        id: fila.id,
        nombre: fila.nombre,
        correo: fila.correo,
        claveHash: fila.clave_hash,
        salt: fila.salt,
      };
    },

    async crear(usuario) {
      const resultado = await db.runAsync(
        'INSERT INTO usuarios (nombre, correo, clave_hash, salt, creado_en) VALUES (?, ?, ?, ?, ?)',
        usuario.nombre,
        usuario.correo,
        usuario.claveHash,
        usuario.salt,
        new Date().toISOString(),
      );
      return {
        id: resultado.lastInsertRowId,
        nombre: usuario.nombre,
        correo: usuario.correo,
      };
    },

    async obtenerSesion() {
      const fila = await db.getFirstAsync<Usuario>(
        'SELECT u.id, u.nombre, u.correo FROM sesion s JOIN usuarios u ON u.id = s.usuario_id WHERE s.id = 1',
      );
      return fila ?? null;
    },

    async guardarSesion(usuarioId) {
      await db.runAsync('INSERT OR REPLACE INTO sesion (id, usuario_id) VALUES (1, ?)', usuarioId);
    },

    async eliminarSesion() {
      await db.runAsync('DELETE FROM sesion WHERE id = 1');
    },
  };
}
