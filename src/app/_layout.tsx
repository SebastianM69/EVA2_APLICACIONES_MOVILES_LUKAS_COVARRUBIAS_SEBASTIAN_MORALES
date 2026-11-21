import { Stack } from 'expo-router';

import { colors } from '@/theme/tokens';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
      }}
    />
  );
}
