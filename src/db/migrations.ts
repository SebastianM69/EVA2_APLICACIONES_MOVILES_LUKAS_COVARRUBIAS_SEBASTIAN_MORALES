import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'eva2-todo.db';

const COLUMNAS_CAPTURA = [
  { nombre: 'latitud', tipo: 'REAL' },
  { nombre: 'longitud', tipo: 'REAL' },
  { nombre: 'foto_uri', tipo: 'TEXT' },
] as const;

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
      latitud REAL,
      longitud REAL,
      foto_uri TEXT,
      creada_en TEXT NOT NULL
    );
  `);

  // CREATE TABLE IF NOT EXISTS no añade columnas a bases creadas antes de RF-11/RF-12.
  const columnas = await db.getAllAsync<{ name: string }>(
    'PRAGMA table_info(tareas)',
  );
  const existentes = new Set(columnas.map((columna) => columna.name));
  for (const { nombre, tipo } of COLUMNAS_CAPTURA) {
    if (!existentes.has(nombre)) {
      await db.execAsync(`ALTER TABLE tareas ADD COLUMN ${nombre} ${tipo}`);
    }
  }
}
