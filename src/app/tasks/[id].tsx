import { useLocalSearchParams } from 'expo-router';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { TaskForm } from '@/features/tasks/components/TaskForm';
import type { TaskInput } from '@/features/tasks/model/task';
import { volverAListaTareas } from '@/features/tasks/navigation';
import { useTasks } from '@/features/tasks/tasks-context';
import { colors, spacing } from '@/theme/tokens';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tareas, editar } = useTasks();
  const tarea = tareas.find((item) => String(item.id) === id);

  if (!tarea) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>
          La tarea no existe o fue eliminada.
        </Text>
        <ActionButton
          label="Volver"
          variant="secondary"
          accessibilityLabel="Volver a mis tareas"
          onPress={volverAListaTareas}
        />
      </View>
    );
  }

  const handleSave = async (input: TaskInput) => {
    try {
      const resultado = await editar(tarea.id, input);
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
      {tarea.fotoUri ? (
        <Image
          source={{ uri: tarea.fotoUri }}
          style={styles.miniatura}
          accessibilityLabel="Foto de la tarea"
        />
      ) : (
        <Text style={styles.dato}>Sin foto</Text>
      )}
      <Text style={styles.dato}>
        {tarea.latitud !== null && tarea.longitud !== null
          ? `Ubicación: ${tarea.latitud.toFixed(5)}, ${tarea.longitud.toFixed(5)}`
          : 'Sin ubicación registrada'}
      </Text>
    </View>
  );

  return (
    <TaskForm
      heading="Editar tarea"
      submitLabel="Guardar cambios"
      initialValues={{ title: tarea.title, description: tarea.description }}
      adjuntos={adjuntos}
      onSave={handleSave}
      onCancel={volverAListaTareas}
    />
  );
}

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.six,
    gap: spacing.three,
  },
  missingText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  adjuntos: {
    gap: spacing.two,
  },
  miniatura: {
    width: '100%',
    height: 220,
    borderRadius: spacing.two,
    backgroundColor: colors.surface,
  },
  dato: {
    color: colors.textSecondary,
    fontSize: 15,
  },
});
