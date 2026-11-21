import type { SQLiteDatabase } from 'expo-sqlite';

import type { Task, TaskInput } from './model/task';

export type TaskRepository = {
  listar(usuarioId: number): Promise<Task[]>;
  crear(usuarioId: number, input: TaskInput): Promise<void>;
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
};

export function crearTaskRepository(db: SQLiteDatabase): TaskRepository {
  return {
    async listar(usuarioId) {
      const filas = await db.getAllAsync<FilaTarea>(
        'SELECT id, titulo, descripcion, completada FROM tareas WHERE usuario_id = ? ORDER BY id DESC',
        usuarioId,
      );
      return filas.map((fila) => ({
        id: fila.id,
        title: fila.titulo,
        description: fila.descripcion,
        completed: fila.completada === 1,
      }));
    },

    async crear(usuarioId, input) {
      await db.runAsync(
        'INSERT INTO tareas (usuario_id, titulo, descripcion, completada, creada_en) VALUES (?, ?, ?, 0, ?)',
        usuarioId,
        input.title,
        input.description,
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
