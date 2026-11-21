export const TASK_TITLE_MAX_LENGTH = 100;
export const TASK_DESCRIPTION_MAX_LENGTH = 500;

export type TaskInput = {
  title: string;
  description: string;
};

// id: INTEGER PRIMARY KEY de la tabla `tareas` (docs/02 sección 3).
// latitud, longitud y fotoUri son null si el permiso fue denegado o la función no se usó.
export type TaskCaptura = {
  latitud: number | null;
  longitud: number | null;
  fotoUri: string | null;
};

export type Task = TaskInput & TaskCaptura & {
  id: number;
  completed: boolean;
};

// Texto visible de la ubicación; compartido por la tarjeta y la pantalla de edición.
export function textoUbicacion(
  tarea: Pick<Task, 'latitud' | 'longitud'>,
): string {
  return tarea.latitud !== null && tarea.longitud !== null
    ? `Ubicación: ${tarea.latitud.toFixed(5)}, ${tarea.longitud.toFixed(5)}`
    : 'Sin ubicación registrada';
}
