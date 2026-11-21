import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import * as Location from 'expo-location';

import { obtenerUbicacionActual } from './ubicacion';

jest.mock('expo-location', () => ({
  PermissionStatus: { GRANTED: 'granted', DENIED: 'denied' },
  Accuracy: { Balanced: 3 },
  requestForegroundPermissionsAsync: jest.fn(),
  getForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

type Permiso = Location.LocationPermissionResponse;

const pedirPermiso = jest.mocked(Location.requestForegroundPermissionsAsync);
const leerPosicion = jest.mocked(Location.getCurrentPositionAsync);

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(Location.getForegroundPermissionsAsync).mockResolvedValue({
    granted: false,
    canAskAgain: true,
    expires: 'never',
    status: Location.PermissionStatus.DENIED,
  });
});

describe('CP-GPS-01: ubicación con permiso concedido', () => {
  it('devuelve latitud y longitud de la lectura', async () => {
    pedirPermiso.mockResolvedValue({
      status: Location.PermissionStatus.GRANTED,
    } as Permiso);
    leerPosicion.mockResolvedValue({
      coords: { latitude: -33.45, longitude: -70.66 },
    } as Location.LocationObject);

    await expect(obtenerUbicacionActual()).resolves.toEqual({
      latitud: -33.45,
      longitud: -70.66,
    });
  });
});

describe('CP-GPS-02: ubicación con permiso denegado', () => {
  it('devuelve null sin lanzar excepción', async () => {
    pedirPermiso.mockResolvedValue({
      status: Location.PermissionStatus.DENIED,
    } as Permiso);

    await expect(obtenerUbicacionActual()).resolves.toBeNull();
  });

  it('devuelve null si el GPS falla tras conceder permiso', async () => {
    pedirPermiso.mockResolvedValue({
      status: Location.PermissionStatus.GRANTED,
    } as Permiso);
    leerPosicion.mockRejectedValue(new Error('GPS desactivado'));

    await expect(obtenerUbicacionActual()).resolves.toBeNull();
  });
});
