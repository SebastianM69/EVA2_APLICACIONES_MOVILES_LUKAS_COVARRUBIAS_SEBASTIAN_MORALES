import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing } from '@/theme/tokens';

type BackButtonProps = {
  onPress: () => void;
};

// Flecha izquierda que reemplaza el botón "Volver"; 48 px de área táctil.
export function BackButton({ onPress }: BackButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Volver a mis tareas"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.arrow}>←</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: spacing.two,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.78,
  },
  arrow: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '600',
  },
});
