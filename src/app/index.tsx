import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/theme/tokens';

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas</Text>
      <Text style={styles.empty}>Sin tareas por ahora.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.four,
    gap: spacing.two,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
