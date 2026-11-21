# To-Do móvil ampliada — Desarrollo de Aplicaciones Móviles, Unidad 2

> **Estado:** base de código en curso. RF-01 a RF-13 **no implementados** todavía; ver [`docs/04`](./docs/04-BITACORA.md).

## Alcance

Ampliación de la To-Do móvil de la Unidad 1 con:

- Autenticación local (registro, inicio y cierre de sesión).
- Tareas asociadas a cada usuario, con CRUD, completar/reabrir y filtros.
- Foto adjunta a cada tarea (cámara del dispositivo).
- Ubicación GPS registrada al crear cada tarea.
- Persistencia local en SQLite, sin conexión.

**Fuera de alcance:** servicios web y APIs externas (ver [`docs/01`](./docs/01-REQUISITOS-RUBRICA.md) sección 4).

## Stack

- React Native + Expo + TypeScript (modo estricto).
- Expo Router (navegación Stack).
- `expo-sqlite`, `expo-camera`, `expo-location`, `expo-crypto`.
- Jest + `jest-expo` + React Native Testing Library.

Decisiones completas en [`docs/02`](./docs/02-DECISIONES-ARQUITECTURA.md).

## Documentación

- [AGENTS.md](./AGENTS.md): reglas para agentes de desarrollo.
- [Requisitos y rúbrica](./docs/01-REQUISITOS-RUBRICA.md)
- [Decisiones y arquitectura](./docs/02-DECISIONES-ARQUITECTURA.md)
- [Plan de pruebas](./docs/03-PLAN-PRUEBAS.md)
- [Bitácora](./docs/04-BITACORA.md)

## Instalación y ejecución

Ejecutar desde la raíz del repositorio.

```bash
npm ci
npx expo start
npx jest
```

Android: Expo Go en emulador o dispositivo, con Metro (`npx expo start --android`). No definir `CI=true` en el entorno: desactiva la recarga en caliente.

Build nativo (`expo run:android`) no viable en el equipo de desarrollo (Windows, límite MAX_PATH; ver `docs/02`, decisión 16).

Verificado: `npx expo install --check`, typecheck, lint y Jest en CHK-003; arranque en emulador con Expo Go en CHK-004 (`docs/evidencias/capturas/EV-01-expo-go-tareas-vacias.png`).

## Entrega

Archivo `EVA2_APLICACIONES_MOVILES_LUKAS_COVARRUBIAS_SEBASTIAN_MORALES` (Word o PDF). Checklist en [`docs/01`](./docs/01-REQUISITOS-RUBRICA.md) sección 6.
