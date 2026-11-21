import { router } from 'expo-router';
import { Alert } from 'react-native';

import { TaskForm } from '@/features/tasks/components/TaskForm';
import type { TaskInput } from '@/features/tasks/model/task';
import { useTasks } from '@/features/tasks/tasks-context';

export default function NewTaskScreen() {
  const { crear } = useTasks();

  const handleSave = async (input: TaskInput) => {
    try {
      const resultado = await crear(input);
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
      heading="Nueva tarea"
      submitLabel="Guardar tarea"
      onSave={handleSave}
      onCancel={() => router.back()}
    />
  );
}
