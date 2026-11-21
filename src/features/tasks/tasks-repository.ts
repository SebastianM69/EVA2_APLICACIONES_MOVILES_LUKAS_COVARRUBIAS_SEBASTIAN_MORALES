import type { SQLiteDatabase } from 'expo-sqlite';

import type { Task, TaskCaptura, TaskInput } from './model/task';

export type TaskRepository = {
  listar(usuarioId: number): Promise<Task[]>;
  crear(
    usuarioId: number,
    input: TaskInput,
    captura: TaskCaptura,
  ): Promise<void>;
  actualizar(usuarioId: number, id: number, input: TaskInput): Promise<void>;
  cambiarCompletada(
    usuarioId: number,
    id: number,
    completada: boolean,
  ): Promise<void>;
  eliminar(usuarioId: number, id: number): Promise<void>;
};

type FilaTarea = {
  id: number;
  titulo: string;
  descripcion: string;
  completada: number;
  latitud: number | null;
  longitud: number | null;
  foto_uri: string | null;
};

export function crearTaskRepository(db: SQLiteDatabase): TaskRepository {
  return {
    async listar(usuarioId) {
      const filas = await db.getAllAsync<FilaTarea>(
        'SELECT id, titulo, descripcion, completada, latitud, longitud, foto_uri FROM tareas WHERE usuario_id = ? ORDER BY id DESC',
        usuarioId,
      );
      return filas.map((fila) => ({
        id: fila.id,
        title: fila.titulo,
        description: fila.descripcion,
        completed: fila.completada === 1,
        latitud: fila.latitud,
        longitud: fila.longitud,
        fotoUri: fila.foto_uri,
      }));
    },

    async crear(usuarioId, input, captura) {
      await db.runAsync(
        'INSERT INTO tareas (usuario_id, titulo, descripcion, completada, latitud, longitud, foto_uri, creada_en) VALUES (?, ?, ?, 0, ?, ?, ?, ?)',
        usuarioId,
        input.title,
        input.description,
        captura.latitud,
        captura.longitud,
        captura.fotoUri,
        new Date().toISOString(),
      );
    },

    async actualizar(usuarioId, id, input) {
      await db.runAsync(
        'UPDATE tareas SET titulo = ?, descripcion = ? WHERE id = ? AND usuario_id = ?',
        input.title,
        input.description,
        id,
        usuarioId,
      );
    },

    async cambiarCompletada(usuarioId, id, completada) {
      await db.runAsync(
        'UPDATE tareas SET completada = ? WHERE id = ? AND usuario_id = ?',
        completada ? 1 : 0,
        id,
        usuarioId,
      );
    },

    async eliminar(usuarioId, id) {
      await db.runAsync(
        'DELETE FROM tareas WHERE id = ? AND usuario_id = ?',
        id,
        usuarioId,
      );
    },
  };
}
