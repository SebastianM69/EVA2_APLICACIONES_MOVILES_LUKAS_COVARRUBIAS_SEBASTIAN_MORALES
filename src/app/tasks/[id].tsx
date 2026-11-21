import { router, useLocalSearchParams } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { TaskForm } from '@/features/tasks/components/TaskForm';
import type { TaskInput } from '@/features/tasks/model/task';
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
          onPress={() => router.back()}
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
      router.back();
      return true;
    } catch {
      Alert.alert('No se pudo guardar', 'Intenta nuevamente.');
      return false;
    }
  };

  return (
    <TaskForm
      heading="Editar tarea"
      submitLabel="Guardar cambios"
      initialValues={{ title: tarea.title, description: tarea.description }}
      onSave={handleSave}
      onCancel={() => router.back()}
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
});
