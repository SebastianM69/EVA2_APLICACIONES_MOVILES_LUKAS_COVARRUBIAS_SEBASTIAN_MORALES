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
