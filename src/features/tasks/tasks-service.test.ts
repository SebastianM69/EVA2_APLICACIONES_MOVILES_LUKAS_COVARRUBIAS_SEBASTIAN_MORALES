import { describe, expect, it, jest } from '@jest/globals';

import type { Task, TaskCaptura, TaskInput } from './model/task';
import type { TaskRepository } from './tasks-repository';
import { crearTarea, filtrarTareas } from './tasks-service';

const SIN_CAPTURA: TaskCaptura = {
  latitud: null,
  longitud: null,
  fotoUri: null,
};

function repositorioEnMemoria(): TaskRepository & { filas: Task[] } {
  const filas: Task[] = [];
  return {
    filas,
    listar: jest.fn(async () => filas),
    crear: jest.fn(
      async (_usuarioId: number, input: TaskInput, captura: TaskCaptura) => {
        filas.push({
          id: filas.length + 1,
          ...input,
          ...captura,
          completed: false,
        });
      },
    ),
    actualizar: jest.fn(async () => undefined),
    cambiarCompletada: jest.fn(async () => undefined),
    eliminar: jest.fn(async () => undefined),
  };
}

describe('CP-TAR-01: crear tarea con título vacío', () => {
  it('devuelve error de validación y no inserta fila', async () => {
    const repo = repositorioEnMemoria();

    const resultado = await crearTarea(repo, 1, {
      title: '   ',
      description: 'Detalle',
    }, SIN_CAPTURA);

    expect(resultado).toEqual({
      ok: false,
      errors: { title: 'Ingresa un título para la tarea' },
    });
    expect(repo.crear).not.toHaveBeenCalled();
    expect(repo.filas).toHaveLength(0);
  });
});

describe('CP-TAR-02: filtro Completadas', () => {
  const tareas: Task[] = [
    { ...SIN_CAPTURA, id: 1, title: 'A', description: 'a', completed: true },
    { ...SIN_CAPTURA, id: 2, title: 'B', description: 'b', completed: false },
    { ...SIN_CAPTURA, id: 3, title: 'C', description: 'c', completed: true },
  ];

  it('devuelve solo tareas con completed = true', () => {
    expect(filtrarTareas(tareas, 'completadas').map((t) => t.id)).toEqual([
      1, 3,
    ]);
  });

  it('Pendientes devuelve solo tareas no completadas', () => {
    expect(filtrarTareas(tareas, 'pendientes').map((t) => t.id)).toEqual([2]);
  });
});
