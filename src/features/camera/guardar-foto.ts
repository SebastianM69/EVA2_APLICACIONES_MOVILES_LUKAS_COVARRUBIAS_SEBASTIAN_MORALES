import { Directory, File, Paths } from 'expo-file-system';

const CARPETA_FOTOS = 'fotos-tareas';

// La URI de caché puede borrarla el sistema; la foto se copia a documentDirectory.
// Lanza error si la copia falla: el llamador decide el mensaje al usuario.
export async function guardarFotoPermanente(
  uriTemporal: string,
): Promise<string> {
  const carpeta = new Directory(Paths.document, CARPETA_FOTOS);
  carpeta.create({ intermediates: true, idempotent: true });
  const destino = new File(carpeta, `foto-${Date.now()}.jpg`);
  await new File(uriTemporal).copy(destino);
  return destino.uri;
}
