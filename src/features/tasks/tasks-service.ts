import type { Task, TaskInput } from './model/task';
import type { TaskRepository } from './tasks-repository';
import { validateTaskInput, type TaskErrors } from './validation/validate-task';

export type FiltroTareas = 'todas' | 'pendientes' | 'completadas';

export type ResultadoGuardado =
  { ok: true } | { ok: false; errors: TaskErrors };

export async function crearTarea(
  repo: TaskRepository,
  usuarioId: number,
  datos: TaskInput,
): Promise<ResultadoGuardado> {
  const validacion = validateTaskInput(datos);
  if (!validacion.valid) {
    return { ok: false, errors: validacion.errors };
  }
  await repo.crear(usuarioId, validacion.value);
  return { ok: true };
}

export async function editarTarea(
  repo: TaskRepository,
  usuarioId: number,
  id: number,
  datos: TaskInput,
): Promise<ResultadoGuardado> {
  const validacion = validateTaskInput(datos);
  if (!validacion.valid) {
    return { ok: false, errors: validacion.errors };
  }
  await repo.actualizar(usuarioId, id, validacion.value);
  return { ok: true };
}

export function filtrarTareas(tareas: Task[], filtro: FiltroTareas): Task[] {
  switch (filtro) {
    case 'pendientes':
      return tareas.filter((tarea) => !tarea.completed);
    case 'completadas':
      return tareas.filter((tarea) => tarea.completed);
    case 'todas':
      return tareas;
  }
}
