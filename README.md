# To-Do móvil ampliada — Desarrollo de Aplicaciones Móviles, Unidad 2

## Introducción

Ampliación de la To-Do móvil de la Unidad 1. La app permite:

- Registrar cuentas y entrar con correo y clave, guardadas localmente.
- Crear, editar, eliminar, completar y filtrar tareas propias de cada usuario.
- Adjuntar una foto a cada tarea con la cámara del dispositivo.
- Registrar la ubicación GPS donde se crea cada tarea.
- Usar la app sin conexión: todo se guarda en SQLite del dispositivo.

No hay servidor, cuentas remotas ni APIs externas. Requisitos completos en [`docs/01`](./docs/01-REQUISITOS-RUBRICA.md).

## Estado

- RF-01 a RF-13 implementados en código (ver `docs/01`, sección 2).
- Pruebas Jest: última ejecución completa registrada 7 suites y 22 pruebas OK (CHK-022).
- Pruebas en Android: CP-MOV-01 a CP-MOV-06 con evidencias `EV-##` y estados en [`docs/03`](./docs/03-PLAN-PRUEBAS.md). CP-MOV-06 queda aprobado con desviación; el defecto "Something went wrong" en modo avión está reproducido (`EV-30`).
- Sin cubrir: RUB-04 y RUB-05 (APIs y servicios web, 48 puntos). Riesgo aceptado: tope 52/100.
- Conflicto aceptado: el enunciado pide Ionic + Capacitor; el proyecto usa React Native + Expo.

## Decisiones de tecnología

| Área | Elegido | Motivo | Exigido por el enunciado o la rúbrica | Estado |
| --- | --- | --- | --- | --- |
| Framework | React Native 0.88.1 + Expo SDK 58 + TypeScript (`strict`) | Aprobado por el equipo (`docs/02`, decisión 1) | Enunciado: Ionic CLI y plugins de Capacitor | Conflicto aceptado; riesgo en `docs/01` sección 4 |
| Navegación | Expo Router con Stack; rutas protegidas con `Stack.Protected` según sesión | Rutas por archivo; pantallas de acceso o de tareas según sesión | No exigido | Implementado |
| Estado | Context + `useReducer` para sesión y tareas; `useState` local en formularios | Sin librerías adicionales | No exigido | Implementado |
| Persistencia | `expo-sqlite` | Almacenamiento local sin conexión (RF-13) | Enunciado: almacenamiento local sin conexión | Cumple; CP-MOV-06 con desviación |
| Autenticación | Local: SHA-256 de `salt + clave` con `expo-crypto`; salt de 16 bytes | Sin servidor; clave nunca en claro | Enunciado: autenticación de usuarios | Cumple; CP-AUTH-01 a 03 OK por Jest |
| Cámara | `expo-camera` y `expo-file-system` (copia de la foto a `documentDirectory`) | Una foto por tarea (RF-11) | Enunciado: captura de imagen; RUB-01, RUB-02, RUB-03 | Cumple; `EV-11`, `EV-18`, `EV-19` |
| Ubicación | `expo-location`, precisión `Balanced`, una lectura al crear la tarea | Posición única por tarea (RF-12) | Enunciado: GPS; RUB-01, RUB-02, RUB-03 | Cumple; `EV-08`, `EV-09`, `EV-26` a `EV-28`, `EV-32` |
| Pruebas | Jest + `jest-expo` + React Native Testing Library | Pruebas de lógica con mocks de periféricos | Enunciado: pruebas de cámara y ubicación; RUB-03 | Cumple en unitarias; en Android se usan casos manuales |
| APIs y servicios web | Ninguno | Exención comunicada por el profesor en clases | RUB-04 (28 puntos) y RUB-05 (20 puntos) | No cubierto (riesgo aceptado) |

Los mocks de `expo-camera` y `expo-location` prueban la lógica, no el dispositivo. Los casos que exigen Android se aprueban solo con evidencia real (`AGENTS.md`, sección 8.1).

Razones detalladas y alternativas descartadas en [`docs/02`](./docs/02-DECISIONES-ARQUITECTURA.md).

## Estructura

```
src/
  app/                 rutas Expo Router (_layout, index, login, register, tasks/)
  features/auth/       sesión, repositorio, servicio y hash de clave
  features/tasks/      contexto, repositorio, modelo, validación y componentes
  features/camera/     captura y copia permanente de la foto
  features/location/   lectura GPS única
  db/                  apertura y migraciones de SQLite
  components/          componentes reutilizables sin lógica de negocio
  theme/tokens.ts      tokens de diseño
```

## Requisitos para ejecutar

- Node.js y npm. Versiones usadas en el equipo de desarrollo: Node v24.19.0, npm 11.17.0.
- Expo Go en Android (emulador o dispositivo físico).
- En dispositivo físico: el teléfono y el equipo en la misma red Wi-Fi.

## Instalación y ejecución

Ejecutar desde la raíz del repositorio.

1. Instalar dependencias exactas del lockfile:

   ```bash
   npm ci
   ```

2. Iniciar Metro y abrir la app en Expo Go:

   ```bash
   npx expo start --android
   ```

   Antes, arrancar el emulador Android (AVD `Medium_Phone_API_37.0`). Con teléfono físico, ejecutar `npx expo start` y escanear el código QR con Expo Go.

3. Comprobar calidad y pruebas:

   ```bash
   npm run typecheck
   npm test
   npm run lint
   ```

   `npm run format:check` pasa (verificado 2026-11-21).

Notas:

- No definir `CI=true` en el entorno: desactiva la recarga en caliente de Metro.
- Build nativo (`npx expo run:android`) no viable en el equipo de desarrollo (Windows, límite MAX_PATH de 260 caracteres; ver `docs/02`, decisión 16). Por eso se usa Expo Go.
- Verificado en el repositorio: `npx expo install --check` y arranque en emulador con Expo Go (CHK-003, CHK-004).

## Documentación

- [AGENTS.md](./AGENTS.md): reglas para agentes de desarrollo.
- [Requisitos y rúbrica](./docs/01-REQUISITOS-RUBRICA.md)
- [Decisiones y arquitectura](./docs/02-DECISIONES-ARQUITECTURA.md)
- [Plan de pruebas](./docs/03-PLAN-PRUEBAS.md)
- [Bitácora](./docs/04-BITACORA.md)

## Entrega

Archivo `EVA2_APLICACIONES_MOVILES_LUKAS_COVARRUBIAS_SEBASTIAN_MORALES` (Word o PDF). Checklist en [`docs/01`](./docs/01-REQUISITOS-RUBRICA.md), sección 6.
