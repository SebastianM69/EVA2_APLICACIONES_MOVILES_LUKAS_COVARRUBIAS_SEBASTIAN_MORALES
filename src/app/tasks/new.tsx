import { useRef, useState } from 'react';
import { Alert, Image, Linking, StyleSheet, View } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { CameraCapture } from '@/features/camera/CameraCapture';
import {
  leerPermisoUbicacion,
  obtenerUbicacionActual,
} from '@/features/location/ubicacion';
import { TaskForm } from '@/features/tasks/components/TaskForm';
import type { TaskInput } from '@/features/tasks/model/task';
import { volverAListaTareas } from '@/features/tasks/navigation';
import { useTasks } from '@/features/tasks/tasks-context';
import { colors, spacing } from '@/theme/tokens';

// La tarea ya está guardada: el aviso no bloquea. Solo se muestra si el permiso está denegado.
async function avisarSinUbicacion() {
  const permiso = await leerPermisoUbicacion();
  if (!permiso || permiso.concedido) return;
  Alert.alert(
    'Sin ubicación',
    'La tarea se guardó sin ubicación porque el permiso de ubicación está denegado.',
    permiso.puedePedirDeNuevo
      ? [{ text: 'Aceptar' }]
      : [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Abrir ajustes', onPress: () => void Linking.openSettings() },
        ],
  );
}

export default function NewTaskScreen() {
  const { crear } = useTasks();
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [camaraAbierta, setCamaraAbierta] = useState(false);
  const guardandoRef = useRef(false);

  const handleSave = async (input: TaskInput) => {
    // Un solo guardado en curso: la lectura GPS tarda hasta 10 s y permite un segundo toque.
    if (guardandoRef.current) return false;
    guardandoRef.current = true;
    let guardada = false;
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
      guardada = true;
      volverAListaTareas();
      if (!ubicacion) void avisarSinUbicacion();
      return true;
    } catch {
      Alert.alert('No se pudo guardar', 'Intenta nuevamente.');
      return false;
    } finally {
      if (!guardada) guardandoRef.current = false;
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
