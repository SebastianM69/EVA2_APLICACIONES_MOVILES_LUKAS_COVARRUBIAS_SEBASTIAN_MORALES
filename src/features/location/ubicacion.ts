import * as Location from 'expo-location';

export type UbicacionTarea = { latitud: number; longitud: number };

// Una sola lectura al crear la tarea (precisión Balanced, sin seguimiento continuo).
// Permiso denegado o fallo del GPS devuelven null: la tarea se guarda sin coordenadas.
export async function obtenerUbicacionActual(): Promise<UbicacionTarea | null> {
  try {
    const permiso = await Location.requestForegroundPermissionsAsync();
    if (permiso.status !== Location.PermissionStatus.GRANTED) {
      return null;
    }
    const posicion = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      latitud: posicion.coords.latitude,
      longitud: posicion.coords.longitude,
    };
  } catch {
    return null;
  }
}
