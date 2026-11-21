# 02 — Decisiones y arquitectura

> **Estado:** decisiones aprobadas por el usuario el 2026-11-21.
> **Regla:** cualquier cambio requiere aprobación expresa y actualización de este documento.

## 1. Decisiones aprobadas

| # | Área | Decisión |
|---|---|---|
| 1 | Framework | React Native + Expo + TypeScript en modo estricto (`"strict": true`). Contradice el enunciado (Ionic + Capacitor); aprobado por el usuario. Riesgo en `docs/01`. |
| 2 | Versiones | Instalar con `npx expo install <paquete>`. Verificar con `npx expo install --check`. No fijar versiones a mano. Confirmar con Context7. |
| 3 | Navegación | Expo Router con Stack. |
| 4 | Estilos | `StyleSheet` con tokens en `src/theme/tokens.ts`. |
| 5 | Estado | Context + `useReducer` para tareas y sesión; `useState` local para formularios y filtros. |
| 6 | Persistencia | `expo-sqlite`. Modelo de datos en la sección 3. |
| 7 | Autenticación | Local, sin servidor. Hash SHA-256 de `salt + clave` con `expo-crypto` (`digestStringAsync`, `SHA256`). Salt de 16 bytes con `getRandomBytesAsync`, guardado en hex. Login con mensaje genérico. |
| 8 | Permisos | Solicitud al ejecutar la acción (foto o creación de tarea con GPS). Si se deniega: la acción continúa sin ese dato y se muestra mensaje no bloqueante. Si está denegado permanentemente: botón "Abrir ajustes" con `Linking.openSettings()`. |
| 9 | Cámara | `expo-camera`. Una foto por tarea; se guarda `foto_uri`. |
| 10 | GPS | `expo-location`, precisión `Balanced`, una lectura al crear la tarea. Sin seguimiento continuo. |
| 11 | APIs | Solo APIs internas del dispositivo (cámara, ubicación, SQLite, cripto). Sin servicios web ni APIs externas. |
| 12 | Alcance | CRUD, validación, completar/reabrir, filtros, confirmación de eliminación, más autenticación y periféricos. Tareas asociadas a `usuario_id`. |
| 13 | Git | Repositorio local, rama `main`, sin remoto. Conventional Commits en español. Sin `push`, `merge`, `rebase` ni `reset --hard`. |
| 14 | Idioma | Documentos y mensajes de UI en español. Identificadores de código en inglés (`Task`, `User`). Nombres de campo SQLite en español (sección 3). |
| 15 | Entrega | Nombre de archivo `EVU2_MORALES_SEBASTIAN`. |

## 2. Estructura de carpetas

```
src/
  app/                 rutas Expo Router: _layout.tsx, index.tsx, login.tsx, register.tsx,
                       tasks/new.tsx, tasks/[id].tsx
  features/auth/       contexto, reducer, servicio de hash
  features/tasks/      contexto, reducer, componentes, validación
  features/camera/     hook usePhotoCapture: pide permiso, toma foto, devuelve uri | null
  features/location/   hook useCurrentLocation: pide permiso, devuelve { latitud, longitud } | null
  db/                  apertura de SQLite, migraciones iniciales, consultas
  theme/tokens.ts      tokens de diseño
  components/          componentes reutilizables sin lógica de negocio
```

Esta estructura es la única aprobada. Crear un directorio o capa nueva requiere aprobación.

## 3. Modelo de datos (SQLite)

```sql
usuarios(
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  correo TEXT NOT NULL UNIQUE,
  clave_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  creado_en TEXT NOT NULL
)

tareas(
  id INTEGER PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  completada INTEGER NOT NULL DEFAULT 0,
  latitud REAL,
  longitud REAL,
  foto_uri TEXT,
  creada_en TEXT NOT NULL
)

sesion(
  id INTEGER PRIMARY KEY CHECK (id = 1),
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id)
)
```

- `sesion` tiene como máximo una fila. Sin fila = sin sesión.
- `latitud`, `longitud` y `foto_uri` son `NULL` cuando el permiso fue denegado o la función no se usó.

## 4. Justificación del stack frente a Capacitor (requisito del enunciado)

| Función | Capacitor / Ionic (enunciado) | Expo / React Native (aprobado) | Ventaja medible |
|---|---|---|---|
| Cámara | Capacitor Camera | `expo-camera` | NO VERIFICADO (sin implementación) |
| Ubicación | Capacitor Geolocation | `expo-location` | NO VERIFICADO |
| Persistencia local | Capacitor Preferences / SQLite | `expo-sqlite` | NO VERIFICADO |
| CLI | Ionic CLI | `npx expo start` | NO VERIFICADO |
| UI | Componentes Ionic | Componentes RN con `StyleSheet` | NO VERIFICADO |

Ninguna ventaja se declara sin evidencia de la implementación. La columna se completa solo con pruebas o mediciones reales.

## 5. Permisos: política

1. Solicitar en la acción, nunca al arrancar.
2. Denegado: continuar sin el dato; mensaje no bloqueante.
3. Denegado permanentemente: ofrecer "Abrir ajustes".
4. No almacenar coordenadas ni fotos fuera del dispositivo.

## 6. Riesgo aceptado

- **APIs externas no implementadas.** RUB-04 y RUB-05 (48 puntos) no cubiertos. La exención del profesor, según el usuario, está justificada por escrito; el documento aún no está adjuntado. Sin ese documento y sin implementación, no se declara Sobresaliente.
- **Stack distinto del enunciado.** Ionic + Capacitor pedido; React Native + Expo aprobado. Explicar en la entrega con la tabla de la sección 4.
- **Sin pruebas de integración de red** (no hay red que probar).
