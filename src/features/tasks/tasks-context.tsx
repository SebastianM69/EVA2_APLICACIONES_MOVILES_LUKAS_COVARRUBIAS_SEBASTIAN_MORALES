import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { useSQLiteContext } from 'expo-sqlite';

import { useAuth } from '@/features/auth/auth-context';
import type { Task, TaskCaptura, TaskInput } from './model/task';
import { crearTaskRepository } from './tasks-repository';
import {
  crearTarea,
  editarTarea,
  type ResultadoGuardado,
} from './tasks-service';

type TasksAction = { type: 'tareas_reemplazadas'; tareas: Task[] };

function tasksReducer(_state: Task[], action: TasksAction): Task[] {
  return action.tareas;
}

type TasksContextValue = {
  tareas: Task[];
  crear(datos: TaskInput, captura: TaskCaptura): Promise<ResultadoGuardado>;
  editar(id: number, datos: TaskInput): Promise<ResultadoGuardado>;
  cambiarCompletada(id: number, completada: boolean): Promise<void>;
  eliminar(id: number): Promise<void>;
};

const TasksContext = createContext<TasksContextValue | null>(null);

function requerirSesion(usuarioId: number | null): number {
  if (usuarioId === null) {
    throw new Error('Operación de tareas sin sesión activa');
  }
  return usuarioId;
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const { usuario } = useAuth();
  const repo = useMemo(() => crearTaskRepository(db), [db]);
  const usuarioId = usuario?.id ?? null;
  const [tareas, dispatch] = useReducer(tasksReducer, []);

  useEffect(() => {
    let activo = true;
    if (usuarioId === null) {
      dispatch({ type: 'tareas_reemplazadas', tareas: [] });
      return;
    }
    repo.listar(usuarioId).then((lista) => {
      if (activo) {
        dispatch({ type: 'tareas_reemplazadas', tareas: lista });
      }
    });
    return () => {
      activo = false;
    };
  }, [repo, usuarioId]);

  const recargar = useCallback(
    async (id: number) => {
      dispatch({ type: 'tareas_reemplazadas', tareas: await repo.listar(id) });
    },
    [repo],
  );

  const crear = useCallback(
    async (datos: TaskInput, captura: TaskCaptura) => {
      const id = requerirSesion(usuarioId);
      const resultado = await crearTarea(repo, id, datos, captura);
      if (resultado.ok) {
        await recargar(id);
      }
      return resultado;
    },
    [repo, usuarioId, recargar],
  );

  const editar = useCallback(
    async (tareaId: number, datos: TaskInput) => {
      const id = requerirSesion(usuarioId);
      const resultado = await editarTarea(repo, id, tareaId, datos);
      if (resultado.ok) {
        await recargar(id);
      }
      return resultado;
    },
    [repo, usuarioId, recargar],
  );

  const cambiarCompletada = useCallback(
    async (tareaId: number, completada: boolean) => {
      const id = requerirSesion(usuarioId);
      await repo.cambiarCompletada(id, tareaId, completada);
      await recargar(id);
    },
    [repo, usuarioId, recargar],
  );

  const eliminar = useCallback(
    async (tareaId: number) => {
      const id = requerirSesion(usuarioId);
      await repo.eliminar(id, tareaId);
      await recargar(id);
    },
    [repo, usuarioId, recargar],
  );

  const value = useMemo(
    () => ({ tareas, crear, editar, cambiarCompletada, eliminar }),
    [tareas, crear, editar, cambiarCompletada, eliminar],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks(): TasksContextValue {
  const value = useContext(TasksContext);
  if (!value) {
    throw new Error('useTasks debe usarse dentro de TasksProvider');
  }
  return value;
}
