import * as Crypto from 'expo-crypto';

const SALT_BYTES = 16;

export async function generarSalt(): Promise<string> {
  const bytes = await Crypto.getRandomBytesAsync(SALT_BYTES);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function hashClave(salt: string, clave: string): Promise<string> {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, salt + clave);
}
