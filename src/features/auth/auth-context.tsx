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

import { crearUsuarioRepository, type Usuario } from './auth-repository';
import {
  iniciarSesionUsuario,
  registrarUsuario,
  type DatosLogin,
  type DatosRegistro,
} from './auth-service';

type AuthState = {
  status: 'loading' | 'anonymous' | 'authenticated';
  usuario: Usuario | null;
};

type AuthAction = { type: 'sesion_establecida'; usuario: Usuario | null };

function authReducer(_state: AuthState, action: AuthAction): AuthState {
  return {
    status: action.usuario ? 'authenticated' : 'anonymous',
    usuario: action.usuario,
  };
}

type AuthContextValue = AuthState & {
  registrar(datos: DatosRegistro): Promise<string | null>;
  iniciarSesion(datos: DatosLogin): Promise<string | null>;
  cerrarSesion(): Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const repo = useMemo(() => crearUsuarioRepository(db), [db]);
  const [state, dispatch] = useReducer(authReducer, {
    status: 'loading',
    usuario: null,
  });

  useEffect(() => {
    let activo = true;
    repo.obtenerSesion().then((usuario) => {
      if (activo) {
        dispatch({ type: 'sesion_establecida', usuario });
      }
    });
    return () => {
      activo = false;
    };
  }, [repo]);

  const registrar = useCallback(
    async (datos: DatosRegistro) => {
      const resultado = await registrarUsuario(repo, datos);
      if (!resultado.ok) {
        return resultado.error;
      }
      dispatch({ type: 'sesion_establecida', usuario: resultado.usuario });
      return null;
    },
    [repo],
  );

  const iniciarSesion = useCallback(
    async (datos: DatosLogin) => {
      const resultado = await iniciarSesionUsuario(repo, datos);
      if (!resultado.ok) {
        return resultado.error;
      }
      dispatch({ type: 'sesion_establecida', usuario: resultado.usuario });
      return null;
    },
    [repo],
  );

  const cerrarSesion = useCallback(async () => {
    await repo.eliminarSesion();
    dispatch({ type: 'sesion_establecida', usuario: null });
  }, [repo]);

  const value = useMemo(
    () => ({ ...state, registrar, iniciarSesion, cerrarSesion }),
    [state, registrar, iniciarSesion, cerrarSesion],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return value;
}
