import { describe, expect, it, jest } from '@jest/globals';

import { capturarFoto, type CamaraDisponible } from './capturar-foto';

describe('CP-PER-01: foto con permiso concedido', () => {
  it('devuelve la URI de la foto capturada', async () => {
    const camara: CamaraDisponible = {
      takePictureAsync: jest.fn(async () => ({ uri: 'file:///x.jpg' })),
    };

    await expect(capturarFoto(camara)).resolves.toBe('file:///x.jpg');
  });
});

describe('CP-PER-02: foto sin cámara montada (permiso denegado)', () => {
  it('devuelve null sin lanzar excepción', async () => {
    await expect(capturarFoto(null)).resolves.toBeNull();
  });
});
