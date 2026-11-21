export type CamaraDisponible = {
  takePictureAsync(opciones: {
    quality: number;
  }): Promise<{ uri: string } | undefined>;
};

// Devuelve la URI de la foto o null si no hay cámara montada o la captura falla.
export async function capturarFoto(
  camara: CamaraDisponible | null,
): Promise<string | null> {
  if (!camara) {
    return null;
  }
  try {
    const foto = await camara.takePictureAsync({ quality: 0.5 });
    return foto?.uri ?? null;
  } catch {
    return null;
  }
}
