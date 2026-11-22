import * as Location from 'expo-location';

export type UbicacionTarea = { latitud: number; longitud: number };

// getCurrentPositionAsync no tiene timeout propio y puede tardar o no responder (expo/expo#10756, #15478).
const TIMEOUT_LECTURA_MS = 10_000;
function conTimeout<T>(promesa: Promise<T>, ms: number): Promise<T | null> {
  const { promise, resolve, reject } = Promise.withResolvers<T | null>();
  const timer = setTimeout(() => resolve(null), ms);
  promesa.then(resolve, reject).finally(() => clearTimeout(timer));
  return promise;
}

// Una sola lectura al crear la tarea (precisión Balanced, sin seguimiento continuo).
// Permiso denegado o fallo del GPS devuelven null: la tarea se guarda sin coordenadas.
export async function obtenerUbicacionActual(): Promise<UbicacionTarea | null> {
  try {
    const permisoActual = await Location.getForegroundPermissionsAsync();
    const permiso = permisoActual.granted
      ? permisoActual
      : await Location.requestForegroundPermissionsAsync();
    if (permiso.status !== Location.PermissionStatus.GRANTED) {
      return null;
    }
    const posicion = await conTimeout(
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      }),
      TIMEOUT_LECTURA_MS,
    );
    if (!posicion) {
      return null;
    }
    return {
      latitud: posicion.coords.latitude,
      longitud: posicion.coords.longitude,
    };
  } catch {
    return null;
  }
}

// Estado del permiso tras una lectura sin coordenadas. Devuelve null si la consulta falla.
export async function leerPermisoUbicacion(): Promise<{
  concedido: boolean;
  puedePedirDeNuevo: boolean;
} | null> {
  try {
    const permiso = await Location.getForegroundPermissionsAsync();
    return {
      concedido: permiso.granted,
      puedePedirDeNuevo: permiso.canAskAgain,
    };
  } catch {
    return null;
  }
}
