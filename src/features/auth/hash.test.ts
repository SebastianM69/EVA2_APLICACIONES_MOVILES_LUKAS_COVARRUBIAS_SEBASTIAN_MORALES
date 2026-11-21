import { describe, expect, it, jest } from '@jest/globals';

import { generarSalt, hashClave } from './hash';

jest.mock('expo-crypto', () => ({
  CryptoDigestAlgorithm: { SHA256: 'SHA-256' },
  digestStringAsync: async (_algorithm: string, data: string) => {
    let hash = 0;
    for (const char of data) {
      hash = (Math.imul(hash, 31) + char.charCodeAt(0)) >>> 0;
    }
    return hash.toString(16).padStart(8, '0').repeat(8);
  },
  getRandomBytesAsync: async (byteCount: number) =>
    Uint8Array.from({ length: byteCount }, () => Math.floor(Math.random() * 256)),
}));

describe('hashClave', () => {
  it('devuelve 64 caracteres hex, distintos de la clave, idénticos para el mismo salt', async () => {
    const salt = 'a'.repeat(32);

    const primera = await hashClave(salt, 'clave1234');
    const segunda = await hashClave(salt, 'clave1234');

    expect(primera).toMatch(/^[0-9a-f]{64}$/);
    expect(primera).not.toBe('clave1234');
    expect(segunda).toBe(primera);
  });
});

describe('generarSalt', () => {
  it('genera 16 bytes en hex y valores distintos entre llamadas', async () => {
    const primero = await generarSalt();
    const segundo = await generarSalt();

    expect(primero).toMatch(/^[0-9a-f]{32}$/);
    expect(segundo).not.toBe(primero);
  });
});
