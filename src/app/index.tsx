import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { useAuth } from '@/features/auth/auth-context';
import { TaskCard } from '@/features/tasks/components/TaskCard';
import type { Task } from '@/features/tasks/model/task';
import { useTasks } from '@/features/tasks/tasks-context';
import {
  filtrarTareas,
  type FiltroTareas,
} from '@/features/tasks/tasks-service';
import { colors, spacing } from '@/theme/tokens';

const FILTROS: { valor: FiltroTareas; etiqueta: string }[] = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'pendientes', etiqueta: 'Pendientes' },
  { valor: 'completadas', etiqueta: 'Completadas' },
];

export default function TasksScreen() {
  const { usuario, cerrarSesion } = useAuth();
  const { tareas, cambiarCompletada, eliminar } = useTasks();
  const [filtro, setFiltro] = useState<FiltroTareas>('todas');
  const visibles = filtrarTareas(tareas, filtro);

  const confirmarEliminacion = (tarea: Task) => {
    Alert.alert(
      'Eliminar tarea',
      `¿Quieres eliminar "${tarea.title}"? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => void eliminar(tarea.id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tareas</Text>
        <Text style={styles.subtitle}>
          Sesión iniciada como {usuario?.nombre ?? ''}.
        </Text>
      </View>

      <View style={styles.filters}>
        {FILTROS.map(({ valor, etiqueta }) => (
          <View key={valor} style={styles.filterItem}>
            <ActionButton
              label={etiqueta}
              variant={filtro === valor ? 'primary' : 'secondary'}
              accessibilityLabel={`Filtrar tareas: ${etiqueta}`}
              onPress={() => setFiltro(valor)}
            />
          </View>
        ))}
      </View>

      <FlatList
        style={styles.list}
        data={visibles}
        keyExtractor={(tarea) => String(tarea.id)}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {tareas.length === 0
              ? 'Sin tareas por ahora.'
              : 'No hay tareas en este filtro.'}
          </Text>
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={() => void cambiarCompletada(item.id, !item.completed)}
            onEdit={() =>
              router.push({
                pathname: '/tasks/[id]',
                params: { id: String(item.id) },
              })
            }
            onDelete={() => confirmarEliminacion(item)}
          />
        )}
      />

      <ActionButton
        label="Nueva tarea"
        onPress={() => router.push('/tasks/new')}
      />
      <ActionButton
        label="Cerrar sesión"
        variant="secondary"
        onPress={cerrarSesion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.six,
    gap: spacing.three,
  },
  header: {
    gap: spacing.one,
    paddingTop: spacing.four,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.one,
  },
  filterItem: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    gap: spacing.three,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: spacing.six,
  },
});
