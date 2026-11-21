import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing } from '@/theme/tokens';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  accessibilityLabel?: string;
  compact?: boolean;
};

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
  accessibilityLabel,
  compact = false,
}: ActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        compact && styles.compact,
        styles[variant],
        pressed && styles.pressed,
      ]}
    >
      <Text
        numberOfLines={compact ? 1 : undefined}
        style={[
          styles.label,
          compact && styles.compactLabel,
          variant === 'primary' && styles.primaryLabel,
          variant === 'danger' && styles.dangerLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.four,
    paddingVertical: spacing.two,
    borderRadius: spacing.two,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.surface,
    borderColor: colors.danger,
  },
  pressed: {
    opacity: 0.78,
  },
  compact: {
    paddingHorizontal: spacing.two,
    minHeight: 44,
  },
  compactLabel: {
    fontSize: 14,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  primaryLabel: {
    color: colors.white,
  },
  dangerLabel: {
    color: colors.danger,
  },
});
