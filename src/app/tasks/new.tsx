import { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { CameraCapture } from '@/features/camera/CameraCapture';
import { obtenerUbicacionActual } from '@/features/location/ubicacion';
import { TaskForm } from '@/features/tasks/components/TaskForm';
import type { TaskInput } from '@/features/tasks/model/task';
import { volverAListaTareas } from '@/features/tasks/navigation';
import { useTasks } from '@/features/tasks/tasks-context';
import { colors, spacing } from '@/theme/tokens';

export default function NewTaskScreen() {
  const { crear } = useTasks();
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [camaraAbierta, setCamaraAbierta] = useState(false);

  const handleSave = async (input: TaskInput) => {
    try {
      // Sin permiso de ubicación la tarea se guarda sin coordenadas.
      const ubicacion = await obtenerUbicacionActual();
      const resultado = await crear(input, {
        latitud: ubicacion?.latitud ?? null,
        longitud: ubicacion?.longitud ?? null,
        fotoUri,
      });
      if (!resultado.ok) {
        return false;
      }
      volverAListaTareas();
      return true;
    } catch {
      Alert.alert('No se pudo guardar', 'Intenta nuevamente.');
      return false;
    }
  };

  const adjuntos = (
    <View style={styles.adjuntos}>
      {fotoUri ? (
        <Image
          source={{ uri: fotoUri }}
          style={styles.miniatura}
          accessibilityLabel="Foto de la tarea"
        />
      ) : null}
      <ActionButton
        label={fotoUri ? 'Reemplazar foto' : 'Tomar foto'}
        variant="secondary"
        onPress={() => setCamaraAbierta(true)}
      />
      <CameraCapture
        visible={camaraAbierta}
        onCapture={(uri) => {
          setFotoUri(uri);
          setCamaraAbierta(false);
        }}
        onClose={() => setCamaraAbierta(false)}
      />
    </View>
  );

  return (
    <TaskForm
      heading="Nueva tarea"
      submitLabel="Guardar tarea"
      adjuntos={adjuntos}
      onSave={handleSave}
      onCancel={volverAListaTareas}
    />
  );
}

const styles = StyleSheet.create({
  adjuntos: {
    gap: spacing.three,
  },
  miniatura: {
    width: '100%',
    height: 220,
    borderRadius: spacing.two,
    backgroundColor: colors.surface,
  },
});
