import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { useAuth } from '@/features/auth/auth-context';
import { colors, spacing } from '@/theme/tokens';

export default function LoginScreen() {
  const { iniciarSesion } = useAuth();
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(await iniciarSesion({ correo, clave }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <TextInput
            accessibilityLabel="Correo"
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            placeholder="Correo"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput
            accessibilityLabel="Clave"
            style={styles.input}
            value={clave}
            onChangeText={setClave}
            placeholder="Clave"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
          />
          {error ? (
            <Text accessibilityRole="alert" style={styles.error}>
              {error}
            </Text>
          ) : null}
          <ActionButton label="Entrar" onPress={handleSubmit} />
          <ActionButton label="Crear cuenta" variant="secondary" onPress={() => router.push('/register')} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.six,
    paddingVertical: spacing.four,
  },
  form: {
    width: '100%',
    maxWidth: 420,
    gap: spacing.three,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.two,
    padding: spacing.three,
    fontSize: 16,
    color: colors.textPrimary,
  },
  error: {
    color: colors.danger,
    fontSize: 14,
  },
});
