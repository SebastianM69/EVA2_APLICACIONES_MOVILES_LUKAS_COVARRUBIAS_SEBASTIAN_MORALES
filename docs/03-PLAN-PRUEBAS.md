# 03 — Plan de pruebas y gates académicos

> **Estado:** CP-PER-01/02 y CP-GPS-01/02 con pruebas unitarias OK (`npx jest src/features/camera src/features/location`, 2026-11-21). Manual en emulador (2026-11-21, CHK-009): CP-MOV-03 y CP-MOV-05 OK; CP-MOV-02 parcial (miniatura visible, imagen negra); CP-MOV-01 y CP-MOV-06 NO EJECUTADO. CP-MOV-04 en emulador FALLO (el emulador no entrega posición a la app, CHK-012). CP-MOV-04 en teléfono Android físico: tarjeta muestra coordenadas (`EV-08`, CHK-013); detalle pendiente de captura.
> **Referencias:** requisitos en [`docs/01`](./01-REQUISITOS-RUBRICA.md); gates de calidad por tarea en [`AGENTS.md`](../AGENTS.md) sección 8.

## 1. Pruebas automatizadas (Jest + `jest-expo` + RNTL)

Mocks de `expo-camera`, `expo-location` y `expo-sqlite` permitidos solo en pruebas unitarias.

| ID | Unidad | Criterio observable | Requisito |
|---|---|---|---|
| CP-PER-01 | `usePhotoCapture` | Con permiso concedido y cámara que resuelve `{ uri: "file:///x.jpg" }`, devuelve `"file:///x.jpg"`. | RF-11, RUB-03 |
| CP-PER-02 | `usePhotoCapture` | Con permiso denegado, devuelve `null` sin lanzar excepción. | RF-11, RUB-02 |
| CP-GPS-01 | `useCurrentLocation` | Con mock de coordenadas `-33.45, -70.66`, devuelve `{ latitud: -33.45, longitud: -70.66 }`. | RF-12, RUB-03 |
| CP-GPS-02 | `useCurrentLocation` | Con permiso denegado, devuelve `null` sin lanzar excepción. | RF-12, RUB-02 |
| CP-AUTH-01 | `hashClave` | Con el mismo salt y clave `"clave1234"`, devuelve 64 caracteres hex, distintos de la clave, idénticos en dos llamadas. | RF-01, RF-02 |
| CP-AUTH-02 | Registro | Correo existente devuelve `"Ya existe una cuenta con ese correo"`. | RF-01 |
| CP-AUTH-03 | Login | Clave incorrecta devuelve `"Correo o clave incorrectos"`. | RF-02 |
| CP-TAR-01 | Crear tarea | Título vacío devuelve error de validación y no inserta fila. | RF-05, RF-10 |
| CP-TAR-02 | Filtro | Filtro "Completadas" devuelve solo tareas con `completada = 1`. | RF-09 |

Criterio: no escribir pruebas que solo comprueben texto del código, valores por defecto o que la función no lance excepción sin verificar su resultado.

## 2. Pruebas manuales en Android (GA-4)

Requieren emulador o dispositivo Android real con Expo Go (modalidad aprobada, `docs/02` decisión 16). Cada caso con captura antes/después cuando la operación lo exige.

| ID | Pasos | Esperado | Requisito |
|---|---|---|---|
| CP-MOV-01 | Registrar cuenta → cerrar sesión → iniciar sesión con las mismas credenciales. | Acceso a la lista de tareas vacía del usuario. | RF-01 a RF-03 |
| CP-MOV-02 | Crear tarea → tomar foto desde el formulario → guardar → abrir detalle. | Miniatura visible en el detalle. | RF-11 |
| CP-MOV-03 | Denegar permiso de cámara → intentar tomar foto → guardar. | Tarea creada sin foto; mensaje no bloqueante. | RF-11, RUB-02 |
| CP-MOV-04 | Crear tarea con GPS permitido → abrir detalle. | Coordenadas visibles. | RF-12 |
| CP-MOV-05 | Denegar GPS → crear tarea → abrir detalle. | Tarea sin coordenadas; mensaje no bloqueante. | RF-12, RUB-02 |
| CP-MOV-06 | Activar modo avión → crear, editar y completar una tarea → cerrar y reabrir la app. | Cambios persisten. | RF-13 |

## 3. Gates académicos

| Gate | Criterio | Estado |
|---|---|---|
| G0 — Planificación | Reglas, requisitos y decisiones documentados y aprobados por el usuario. | APROBADO (2026-11-21) |
| G1 — Reproducibilidad | `npm ci`, `npx expo install --check`, `npx jest`, `npx expo start` ejecutados con resultados reales. | PARCIAL: `expo install --check`, typecheck, lint y `jest` 5/5 OK (CHK-003); arranque de `expo start` OK (CHK-004). Falta `npm ci` limpio. |
| G2 — Funciones esenciales | RF-01 a RF-13 implementados y CP-AUTH, CP-TAR, CP-PER, CP-GPS aprobados. | NO EJECUTADO |
| G3 — UX Android | CP-MOV-01 a CP-MOV-06 con evidencia auténtica y revisión humana. | PARCIAL: CP-MOV-03 y CP-MOV-05 OK; CP-MOV-02 parcial; CP-MOV-04 tarjeta OK en teléfono físico (`EV-08`), detalle pendiente; CP-MOV-01 y CP-MOV-06 NO EJECUTADO. |
| G4 — Entrega | Checklist de `docs/01` sección 6 completo; PDF o Word con nombre `EVA2_APLICACIONES_MOVILES_LUKAS_COVARRUBIAS_SEBASTIAN_MORALES`. | NO EJECUTADO |

Cierre de entrega: todos los casos en `APROBADO` o en `NO EJECUTADO`/`BLOQUEADO` con motivo escrito.

## 4. Evidencias

- Ruta: `./docs/evidencias/capturas/` desde la raíz (`./evidencias/capturas/` desde `docs/`).
- `EV-01` (agente; emulador `Medium_Phone_API_37.0`; Expo Go; commit `a2e5b8f`): pantalla "Tareas / Sin tareas por ahora.". Revisión humana pendiente.
- Formato y trazabilidad: `EV-##` según `AGENTS.md` sección 8.1.
- Ningún caso se marca `APROBADO` por mock o prueba unitaria si el caso exige Android.

![EV-01 Expo Go, pantalla Tareas](./evidencias/capturas/EV-01-expo-go-tareas-vacias.png)
