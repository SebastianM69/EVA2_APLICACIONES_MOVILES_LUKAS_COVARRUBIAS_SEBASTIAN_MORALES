import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';
import { textoUbicacion } from '@/features/tasks/model/task';
import { volverAListaTareas } from '@/features/tasks/navigation';
import { useTasks } from '@/features/tasks/tasks-context';
import { colors, spacing } from '@/theme/tokens';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tareas } = useTasks();
  const tarea = tareas.find((item) => String(item.id) === id);

  if (!tarea) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.missing}>
          <Text style={styles.missingText}>
            La tarea no existe o fue eliminada.
          </Text>
          <BackButton onPress={volverAListaTareas} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{tarea.title}</Text>
        <Text style={styles.description}>{tarea.description}</Text>

        {tarea.fotoUri ? (
          <Image
            source={{ uri: tarea.fotoUri }}
            style={styles.miniatura}
            accessibilityLabel="Foto de la tarea"
          />
        ) : (
          <Text style={styles.dato}>Sin foto</Text>
        )}
        <Text style={styles.dato}>{textoUbicacion(tarea)}</Text>

        <BackButton onPress={volverAListaTareas} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.six,
    gap: spacing.three,
  },
  missing: {
    flex: 1,
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
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 22,
  },
  miniatura: {
    width: '100%',
    height: 260,
    borderRadius: spacing.two,
    backgroundColor: colors.surface,
  },
  dato: {
    color: colors.textSecondary,
    fontSize: 15,
  },
});
