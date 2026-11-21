import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { useAuth } from '@/features/auth/auth-context';
import { colors, spacing } from '@/theme/tokens';

export default function TasksScreen() {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tareas</Text>
        <Text style={styles.subtitle}>Sesión iniciada como {usuario?.nombre ?? ''}.</Text>
      </View>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Sin tareas por ahora.</Text>
      </View>
      <ActionButton label="Cerrar sesión" variant="secondary" onPress={cerrarSesion} />
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
});
