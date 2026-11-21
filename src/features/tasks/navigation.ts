import { router } from 'expo-router';

/**
 * Vuelve a la pantalla anterior. Sin historial (p. ej. tras reabrir la app
 * en Expo Go), `router.back()` no hace nada, así que va a la lista de tareas.
 */
export function volverAListaTareas(): void {
  if (router.canGoBack()) {
    router.back();
    return;
  }
  router.replace('/');
}
