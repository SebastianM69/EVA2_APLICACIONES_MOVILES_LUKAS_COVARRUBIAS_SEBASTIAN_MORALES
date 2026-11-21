import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Linking, Modal, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { colors, spacing } from '@/theme/tokens';
import { capturarFoto } from './capturar-foto';
import { guardarFotoPermanente } from './guardar-foto';

type CameraCaptureProps = {
  visible: boolean;
  onCapture: (uri: string) => void;
  onClose: () => void;
};

export function CameraCapture({
  visible,
  onCapture,
  onClose,
}: CameraCaptureProps) {
  const [permiso, pedirPermiso] = useCameraPermissions();
  const camaraRef = useRef<CameraView>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const concedido = permiso?.granted === true;

  const handleCapture = async () => {
    const uri = await capturarFoto(camaraRef.current);
    if (!uri) {
      setMensaje(
        'No se pudo tomar la foto. Intenta nuevamente o guarda sin foto.',
      );
      return;
    }
    try {
      const permanente = await guardarFotoPermanente(uri);
      setMensaje(null);
      onCapture(permanente);
    } catch {
      setMensaje(
        'No se pudo guardar la foto. Intenta nuevamente o guarda sin foto.',
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.contenedor}>
        {concedido ? (
          <CameraView ref={camaraRef} style={styles.camara} facing="back" />
        ) : (
          <View style={styles.sinPermiso}>
            <Text style={styles.texto}>
              Sin permiso de cámara. Puedes guardar la tarea sin foto.
            </Text>
            {permiso?.canAskAgain === false ? (
              <ActionButton
                label="Abrir ajustes"
                onPress={() => void Linking.openSettings()}
              />
            ) : (
              <ActionButton
                label="Permitir cámara"
                onPress={() => void pedirPermiso()}
              />
            )}
          </View>
        )}

        {mensaje ? <Text style={styles.texto}>{mensaje}</Text> : null}

        <View style={styles.acciones}>
          {concedido ? (
            <ActionButton
              label="Tomar foto"
              onPress={() => void handleCapture()}
            />
          ) : null}
          <ActionButton
            label="Cancelar"
            variant="secondary"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.four,
    gap: spacing.three,
    justifyContent: 'center',
  },
  camara: {
    flex: 1,
    minHeight: 300,
  },
  sinPermiso: {
    gap: spacing.three,
  },
  texto: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  acciones: {
    gap: spacing.three,
  },
});
