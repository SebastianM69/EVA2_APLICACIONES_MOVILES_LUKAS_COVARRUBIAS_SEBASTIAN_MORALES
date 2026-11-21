import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { DATABASE_NAME, migrarBaseDeDatos } from '@/db/migrations';
import { AuthProvider, useAuth } from '@/features/auth/auth-context';
import { TasksProvider } from '@/features/tasks/tasks-context';
import { colors } from '@/theme/tokens';

export default function RootLayout() {
  return (
    <Suspense
      fallback={
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      }
    >
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        onInit={migrarBaseDeDatos}
        useSuspense
      >
        <AuthProvider>
          <TasksProvider>
            <AuthStack />
          </TasksProvider>
        </AuthProvider>
      </SQLiteProvider>
    </Suspense>
  );
}

function AuthStack() {
  const { status } = useAuth();
  if (status === 'loading') {
    return null;
  }
  const autenticado = status === 'authenticated';

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
      }}
    >
      <Stack.Protected guard={autenticado}>
        <Stack.Screen name="index" options={{ title: 'Inicio' }} />
        <Stack.Screen name="tasks/new" options={{ headerShown: false }} />
        <Stack.Screen name="tasks/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="tasks/detalle/[id]"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!autenticado}>
        <Stack.Screen name="login" options={{ title: 'Iniciar sesión' }} />
        <Stack.Screen name="register" options={{ title: 'Crear cuenta' }} />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
