import * as Location from 'expo-location';

export type UbicacionTarea = { latitud: number; longitud: number };

// getCurrentPositionAsync no tiene timeout propio y puede tardar o no responder (expo/expo#10756, #15478).
const TIMEOUT_LECTURA_MS = 10_000;
// Última posición conocida aceptable si la lectura nueva no llega a tiempo.
const EDAD_MAXIMA_ULTIMA_MS = 10 * 60 * 1000;

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
    const permiso = await Location.requestForegroundPermissionsAsync();
    if (permiso.status !== Location.PermissionStatus.GRANTED) {
      return null;
    }
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      }),
    const posicion =
      (await conTimeout(
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }),
        TIMEOUT_LECTURA_MS,
      )) ??
      (await Location.getLastKnownPositionAsync({
        maxAge: EDAD_MAXIMA_ULTIMA_MS,
      }));
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
