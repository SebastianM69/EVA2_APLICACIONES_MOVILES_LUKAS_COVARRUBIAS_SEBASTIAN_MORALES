export const TASK_TITLE_MAX_LENGTH = 100;
export const TASK_DESCRIPTION_MAX_LENGTH = 500;

export type TaskInput = {
  title: string;
  description: string;
};

// id: INTEGER PRIMARY KEY de la tabla `tareas` (docs/02 sección 3).
// Campos usuario_id, latitud, longitud, foto_uri y creada_en se añaden con su funcionalidad.
export type Task = TaskInput & {
  id: number;
  completed: boolean;
};
