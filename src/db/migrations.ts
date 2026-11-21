import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'eva2-todo.db';

export async function migrarBaseDeDatos(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL UNIQUE,
      clave_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      creado_en TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sesion (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id)
    );

    CREATE TABLE IF NOT EXISTS tareas (
      id INTEGER PRIMARY KEY,
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      completada INTEGER NOT NULL DEFAULT 0,
      creada_en TEXT NOT NULL
    );
  `);
}
