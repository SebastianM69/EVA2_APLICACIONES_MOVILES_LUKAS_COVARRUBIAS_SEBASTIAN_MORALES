# 04 — Bitácora y checkpoints

## CHK-001 — Reglas de desarrollo

- **Fecha:** 2026-11-21
- **Autor:** agente OMP (sesión de planificación con el usuario)
- **Objetivo:** crear repositorio Git y documentos de reglas antes de escribir código.
- **Estado:** `EN VALIDACIÓN` (documentos creados; commit de docs pendiente de registrar).
- **Requisitos asociados:** ninguno implementado. Ver `docs/01`.
- **Pruebas asociadas:** ninguna (etapa documental). Ver `docs/03`.
- **Repositorio:** `git init -b main` ejecutado en la raíz; sin remoto.
- **Commit real:** `d86b7de1bb` (`docs: reglas de desarrollo y requisitos EVA2`), rama `main`, sin remoto.
- **Archivos creados:**
  - `AGENTS.md`
  - `README.md`
  - `.gitignore` (copiado de la sección de ignorados de EVA1 `.gitignore`, sin cambios)
  - `docs/01-REQUISITOS-RUBRICA.md`
  - `docs/02-DECISIONES-ARQUITECTURA.md`
  - `docs/03-PLAN-PRUEBAS.md`
  - `docs/04-BITACORA.md`
- **Verificación de puntos de rúbrica:** `Rúbrica_U2.pdf` releído; niveles RUB-01/02/05 0/5/10/20, RUB-03 0/3/6/12, RUB-04 0/7/14/28; total 100.
- **Evidencias `EV-##`:** ninguna.
- **Errores/bloqueos:** ninguno en la etapa documental.

### Decisiones pendientes

1. **Constancia escrita de exención:** no existe. Decisión comunicada por el profesor en clases (CHK-002).
2. **Conflicto de stack:** enunciado Ionic + Capacitor vs. aprobado React Native + Expo. Riesgo aceptado; requiere presentación explícita en entrega.
3. **Dispositivo Android para GA-4:** emulador. AVD disponibles: `Medium_Phone_API_37.0`, `Pixel_10_Pro_XL`. Ningún dispositivo conectado. NO EJECUTADO hasta capturas reales.
4. **Nombre de entrega:** resuelto en CHK-002.

### Riesgos

- RUB-04 y RUB-05 (48 puntos) sin cubrir; tope 52/100 sin APIs.

### Siguiente acción

Commit de la etapa documental y registro del hash en esta bitácora. Luego esperar autorización expresa para implementación.

### Autorización necesaria

Autorización expresa del usuario para iniciar la etapa de implementación.

## CHK-002 — Decisiones del usuario: stack, exención, dispositivo y grupo

- **Fecha:** 2026-11-21
- **Autor:** agente OMP (sesión de planificación con el usuario)
- **Objetivo:** registrar decisiones del usuario antes de autorizar implementación.
- **Estado:** `EN VALIDACIÓN` (documentos editados; sin commit).
- **Decisiones:**
- Stack: se mantiene React Native + Expo + TypeScript, justificación en `docs/02` sección 4. Contradice el enunciado (Ionic + Capacitor); debe explicarse en la entrega.
- APIs: el profesor comunicó en clases que solo se usan APIs internas. No hay documento escrito. RUB-04 y RUB-05 siguen sin cubrir; tope 52/100.
- Dispositivo: emulador Android. AVD disponibles: `Medium_Phone_API_37.0`, `Pixel_10_Pro_XL`. `adb devices` sin dispositivos. GA-4 NO EJECUTADO.
- Grupo: Lukas Covarrubias y Sebastian Morales.
- **Nombre de entrega:** decidido por el usuario: `EVA2_APLICACIONES_MOVILES_LUKAS_COVARRUBIAS_SEBASTIAN_MORALES`. Difiere de `EVU2_APELLIDO_NOMBRE` del enunciado; riesgo de penalización. Confirmar con el profesor si es necesario.
- **Pruebas asociadas:** ninguna (etapa documental).
- **Autorización necesaria:** implementación no autorizada.

## CHK-003 — Cierre de pendientes: assets, dependencias, TaskForm y bundle

- **Fecha:** 2026-11-21
- **Autor:** agente OMP
- **Objetivo:** resolver pendientes tras commits de código base.
- **Estado:** `PARCIAL`. Build y gates OK; ejecución en dispositivo NO EJECUTADA.
- **Commits:**
  - `4b468af` feat: copia assets referenciados por app.json desde EVA1 (solo archivos referenciados).
  - `33272ad` chore: alinea dependencias Expo con `npx expo install --fix`.
  - `fed9d23` feat: agrega formulario TaskForm usado por TaskForm.test.
- **Verificación:**
  - `npx expo install --check`: OK (tras fix; antes 8 paquetes desalineados).
  - typecheck, lint, jest 5/5, format:check: OK.
  - `npx expo export --platform android`: OK (bundle Hermes generado en directorio temporal, fuera del repo).
- **Pruebas asociadas:** CP-PER/CP-GPS/CP-AUTH/CP-TAR de `docs/03` aún no implementadas; no hay código de periféricos ni autenticación.
- **Evidencias `EV-##`:** ninguna.
- **Errores/bloqueos:** `adb` no está en PATH; AVD disponibles `Medium_Phone_API_37.0`, `Pixel_10_Pro_XL`; sin dispositivo conectado.
- **Decisiones pendientes:** resueltas en CHK-004 (Expo Go; ver decisión 16 de `docs/02`).

## CHK-004 — Ejecución en Android con Expo Go y adaptación documental

- **Fecha:** 2026-11-21
- **Autor:** agente OMP (sesión con el usuario)
- **Objetivo:** ejecutar la app base en emulador y alinear la documentación con el repositorio real.
- **Estado:** `EN VALIDACIÓN` (captura real tomada; revisión humana pendiente).
- **Requisitos asociados:** ninguno completo. Solo arranque de la base; RF-01 a RF-13 no implementados (ver `docs/01`).
- **Pruebas asociadas:** ningún caso de `docs/03` ejecutado. Verificación de arranque únicamente.
- **Commits:**
  - `a2e5b8f` feat: agrega layout raíz y pantalla inicial de tareas (`src/app/_layout.tsx`, `src/app/index.tsx`).
- **Verificación:**
  - `npx expo start --android --port 8081`: Metro `Waiting on http://localhost:8081`. El entorno tenía `CI=true`: recarga en caliente desactivada.
  - Emulador `emulator-5554` (`Medium_Phone_API_37.0`): foco en `host.exp.exponent` (Expo Go). Captura `EV-01`: "Tareas / Sin tareas por ahora.".
  - `expo run:android` (dev build): fallido con `Filename longer than 260 characters` (CMake/ninja, `react-native-gesture-handler`). Descartado.
- **Cambios revertidos:** `package.json` (scripts `android`/`ios` volvieron a `expo start`) y `app.json` (`"package"` eliminado), con `git checkout`. Quedan iguales al último commit.
- **Eliminado a Papelera:** carpeta `android/` del proyecto (salida de prebuild, gitignored) y copia de verificación fuera del repo (`EVA2_build` en la raíz de `C:`). Logs temporales fuera del repo: no eliminados.
- **Evidencias `EV-##`:** `EV-01` (`docs/evidencias/capturas/EV-01-expo-go-tareas-vacias.png`): método agente; dispositivo `Medium_Phone_API_37.0`; versión Android NO VERIFICADO; modalidad Expo Go; commit `a2e5b8f`; revisor humano pendiente.
- **Documentación adaptada:** `AGENTS.md` (estado y sección 12), `README.md` (estado y ejecución), `docs/02` (decisión 16, estructura real, riesgo de runtime), `docs/03` (G1 parcial, EV-01), `docs/04` (CHK-003 resuelto y este checkpoint).
- **Discrepancias corregidas:** `AGENTS.md` y `README.md` decían "implementación no iniciada" y "sin código" aunque existían commits de código y dependencias instaladas. `docs/03` marcaba G1 `NO EJECUTADO` pese a verificaciones de CHK-003. CHK-003 dejaba pendiente la decisión de runtime.
- **Riesgos:**
  - Expo Go limita los módulos nativos a los incluidos en su SDK. Compatibilidad de `expo-sqlite`, `expo-camera`, `expo-location` y `expo-crypto` con Expo Go de SDK 58: NO VERIFICADO; confirmar con Context7 antes de implementar.
  - `LongPathsEnabled=0` en el equipo: sin cambio de configuración global (requiere administrador).
- **Decisiones:** decisión 16 de `docs/02` confirmada por el usuario. **Pendiente:** validación humana de `EV-01`.
- **Siguiente acción:** commit de documentación; registrar su hash en el siguiente checkpoint, como en CHK-001.
- **Autorización necesaria:** autorización expresa para la siguiente etapa (autenticación RF-01 a RF-03, con SQLite y `expo-crypto`), con consulta previa a Context7 (`AGENTS.md` sección 3).

## CHK-005 — Cabecera "Inicio" y cierre documental de CHK-004

- **Fecha:** 2026-11-21
- **Autor:** agente OMP (sesión con el usuario)
- **Objetivo:** registrar el cambio de título de cabecera y el cierre documental de la decisión 16.
- **Estado:** `VALIDADA` (EV-01 y EV-02 revisadas y aprobadas por el usuario el 2026-11-21).
- **Requisitos asociados:** ninguno completo. Solo cambio de texto de cabecera; RF-01 a RF-13 no implementados (ver `docs/01`).
- **Pruebas asociadas:** verificación de arranque y título; ningún caso de `docs/03` ejecutado.
- **Commits:**
  - `ce75b6d` feat: cambia título de cabecera a Inicio (`src/app/_layout.tsx`).
  - Commit de documentación: posterior a `ce75b6d`; su hash se registra en el siguiente checkpoint.
- **Verificación:**
  - Metro reiniciado con `-c`. `entry.bundle` contiene `title: 'Inicio'`.
  - `pm clear host.exp.exponent` en `emulator-5554` (aprobado por el usuario): borra datos de Expo Go en el emulador.
  - Captura de cabecera `Inicio` (12:56): `docs/evidencias/capturas/EV-02-expo-go-titulo-tareas.png`. Versionada; revisión humana pendiente.
- **Causa del título anterior:** bundle de entrada en caché de Metro/Expo Go; no era un fallo del código.
- **Evidencias `EV-##`:**
  - `EV-01` (`docs/evidencias/capturas/EV-01-expo-go-tareas-vacias.png`): versionada; validada por el usuario el 2026-11-21.
  - `docs/evidencias/capturas/EV-02-expo-go-titulo-tareas.png`: reemplazada por la captura de cabecera `Inicio` (12:56). La captura anterior (spinner de carga, 12:40) se descartó y se conservó fuera del repo.
- **Decisiones:** decisión 16 de `docs/02` confirmada por el usuario (2026-11-21). Su documentación se commitea con CHK-004 y CHK-005.
- **Siguiente acción:** implementar RF-01 a RF-03 (`expo-sqlite`, `expo-crypto`) según la autorización de la sección Autorización; fuente registrada: documentación oficial Expo SDK 58.
- **Autorización:** el usuario autorizó RF-01 a RF-03 (autenticación local con `expo-sqlite` y `expo-crypto`) el 2026-11-21, usando documentación oficial Expo SDK 58 como fuente mientras Context7 no esté configurado. Condiciones: revisión humana de `EV-01` y `EV-02` antes de avanzar; commit documental antes de implementar.

## CHK-006 — Autenticación local RF-01 a RF-03 (código y pruebas unitarias)

- **Fecha:** 2026-11-21
- **Autor:** agente OMP (sesión con el usuario)
- **Objetivo:** implementar registro e inicio de sesión locales con SQLite y hash SHA-256 + salt.
- **Estado:** `VALIDACIÓN PARCIAL`. Código, pruebas Jest y verificación manual en Expo Go (emulador `Medium_Phone_API_37.0`) OK; revisión humana de `EV-03` a `EV-07` OK (2026-11-21). Ejecución en dispositivo físico NO EJECUTADA.
- **Requisitos asociados:** RF-01 a RF-03 (registro, inicio de sesión, almacenamiento de clave hasheada). Ver `docs/01`.
- **Pruebas asociadas:** Jest `src/features/auth`: 2 suites, 8/8 OK (incluye nombres CP-AUTH-02 y CP-AUTH-03 de `docs/03`). Sin ejecución en dispositivo.
- **Commits:**
  - `75fa30b` feat: autenticación local con SQLite y hash SHA-256 (RF-01 a RF-03): `app.json` (solo plugin `expo-sqlite`), `package.json`, `package-lock.json`, `src/app/`, `src/db/`, `src/features/auth/`.
  - Commit documental con esta bitácora y capturas `EV-03` a `EV-07`: posterior a `75fa30b`.
- **Pendiente fuera de alcance:** cambio de `name` en `app.json` ("To-Do móvil ampliada" → "TODO EVA2") no atribuido a este checkpoint; no incluido en commits.
- **Verificación:**
  - `npx tsc --noEmit`: exit 0 (tras regenerar `.expo/types/router.d.ts` con `expo start` en puerto 8092; `.expo/` gitignored).
  - `npx jest src/features/auth`: 8/8 OK.
  - `npx eslint src/app src/db src/features/auth`: 0 errores, 0 warnings.
- **Decisiones técnicas:**
  - Hash real `expo-crypto` SHA-256 en `src/features/auth/hash.ts`. Los tests de auth usan mock determinista de `expo-crypto`: `@types/node` no está incluido en `tsconfig` (hereda base de Expo), y no se modificó la configuración del proyecto.
- **Evidencias `EV-##`:** `docs/evidencias/capturas/` (agente; emulador `Medium_Phone_API_37.0`; Expo Go; capturas de la app real; revisión humana pendiente):
  - `EV-03-expo-go-clave-incorrecta.png`: login con clave incorrecta muestra "Correo o clave incorrectos".
  - `EV-04-expo-go-clave-corta.png`: registro con clave de 3 caracteres muestra "La clave debe tener al menos 8 caracteres".
  - `EV-05-expo-go-tareas-sin-flecha.png`: pantalla Tareas tras iniciar sesión, sin flecha de retroceso.
  - `EV-06-expo-go-sesion-tras-reabrir.png`: pantalla Tareas tras cerrar y reabrir Expo Go; sesión mantenida.
- **Errores/bloqueos:**
  - Puerto 8081 ocupado por proceso previo; se usó 8092. Procesos `node.exe` ajenos a esta sesión no se cerraron.
  - Comando `timeout` de shell devolvió salida vacía en este entorno; no afectó resultados posteriores.
- **Riesgos:**
  - Compatibilidad de `expo-sqlite` y `expo-crypto` con Expo Go SDK 58: verificada en emulador `Medium_Phone_API_37.0` (registro, login, cierre de sesión y persistencia funcionan). Dispositivo físico NO VERIFICADO.
  - Mock de `expo-crypto` en tests no prueba el digest real; el digest real solo se valida en ejecución nativa/Expo Go.
- **Verificación manual Expo Go (2026-11-21, emulador):** resultados por paso:
  - Paso 1, clave corta (3 caracteres): error de clave mínima, sin sesión. OK (`EV-04`).
  - Paso 2, registro válido: entra a Tareas con "Sesión iniciada como Sebastian". OK.
  - Paso 3, cerrar sesión: vuelve a Iniciar sesión. OK.
  - Paso 4, clave incorrecta: "Correo o clave incorrectos", sin sesión. OK (`EV-03`).
  - Paso 5, clave correcta: entra a Tareas. OK.
  - Paso 6, cerrar y reabrir Expo Go: sesión mantenida. OK (`EV-06`).
  - Flecha de retroceso: desde Crear cuenta vuelve a Iniciar sesión. OK. Desde Tareas no aparece flecha (`EV-05`).
- **Corrección de flecha tras registro:** `src/app/_layout.tsx` usa `Stack.Protected` (guards `autenticado` / `!autenticado`, Expo Router 58 docs oficiales); se quitaron los `Redirect` manuales de `index`, `login` y `register`. Verificado: tsc OK, Jest auth 8/8 OK, eslint `src/app` OK. Expo Go (emulador, 2026-11-21 14:29): registro de cuenta nueva "Lukas" entra a Tareas sin flecha "<-" (`EV-07`). OK.
- **Distribución de pantallas (ajuste posterior, 2026-11-21 14:33, emulador):** login y registro: formulario en columna con ancho máximo 420, centrado, con `KeyboardAvoidingView` + `ScrollView` (patrón de `TaskForm`). Tareas: cabecera arriba, estado vacío centrado, "Cerrar sesión" abajo. Capturas revisadas en emulador: Tareas, login y registro. Comportamiento con teclado: fuera de alcance de verificación por decisión del usuario (no aplica al emulador). Captura guardada en `docs/evidencias`: NO.
- **Siguiente acción:** implementar RF-04 a RF-10 (tareas CRUD con SQLite, filtros y validación; CP-TAR-01 y CP-TAR-02). Autorizado por el usuario (2026-11-21).
- **Autorización:** RF-04 a RF-10 autorizados; commits locales autorizados (2026-11-21).

## CHK-007 — Tareas CRUD, filtros y validación (RF-04 a RF-10)

- **Fecha:** 2026-11-21
- **Autor:** agente OMP (sesión con el usuario)
- **Objetivo:** tareas por usuario con SQLite: listar, crear, editar, completar/reabrir, eliminar con confirmación, filtros y validación.
- **Estado:** `CERRADO` por decisión del usuario (2026-11-21). Código, pruebas Jest y verificación manual Expo Go OK en todos los puntos. Riesgo de truncado silencioso resuelto (ver Decisiones técnicas y Verificación manual).
- **Requisitos asociados:** RF-04 a RF-10. Ver `docs/01`.
- **Pruebas asociadas:** Jest `src/features/tasks/tasks-service.test.ts` (CP-TAR-01, CP-TAR-02) y `src/features/tasks/components/TaskForm.test.tsx`. Suite completa: 5 suites, 17/17 OK.
- **Verificación:**
  - `npx tsc --noEmit`: exit 0.
  - `npx jest --runInBand`: 17/17 OK (incluye test de exceso de `TaskForm`).
  - `npx eslint .`: exit 0.
  - `npx prettier --check` sobre archivos creados o reescritos en esta etapa: OK. `npm run format:check` completo sigue fallando en 8 archivos previos no tocados (`auth-*`, `hash.ts`, `hash.test.ts`, `_layout.tsx`, `login.tsx`, `register.tsx`); fuera de alcance.
- **Decisiones técnicas:**
  - `TaskForm.onSave` pasa a `Promise<boolean>` para persistencia asíncrona; mocks de `TaskForm.test.tsx` actualizados.
  - Repositorio y servicio filtran por `usuario_id` de la sesión activa en cada consulta y mutación.
  - Límites de título (100) y descripción (500): se quitó `maxLength` de los `TextInput` en `TaskForm.tsx`. Autorizado por el usuario (2026-11-21). El campo ya no corta; el contador muestra el exceso y `validateTaskInput` bloquea el guardado con mensaje visible (RF-10).
- **Verificación manual Expo Go (2026-11-21, emulador `Medium_Phone_API_37.0`, `emulator-5554`):**
  - Crear cuenta `qa.rf07@example.com` y `qa.dos@example.com`; inicio de sesión OK.
  - Lista vacía: "Sin tareas por ahora." OK.
  - Exceso (101 y 501 caracteres): corregido. Contador `101/100`, texto conservado, al guardar aparece "El título supera el máximo de 100 caracteres" y no guarda. Con título de 100 caracteres guarda y aparece en la lista. Verificado en emulador. Caso 501 en descripción: cubierto por Jest (`TaskForm.test.tsx`), no repetido en emulador.
  - Nueva tarea válida aparece en Todas. OK. Aparece en Pendientes antes de completar. OK.
  - Completar y reabrir: sale de Pendientes; al reabrir vuelve a "Pendiente". OK.
  - Editar: título vacío muestra "Ingresa un título para la tarea". OK. Edición válida guardada. OK. Edición tras dos reinicios de la app (`force-stop`): campos cargan y el cambio persiste. OK. En un intento el campo perdió caracteres al teclear; se repitió con texto verificado antes de guardar.
  - Eliminar: Cancelar conserva la tarea; ELIMINAR la borra. OK.
  - Filtro sin resultados: "No hay tareas en este filtro." OK.
  - Aislamiento por usuario: QA no ve "Tarea de B"; B no ve "Tarea de QA". OK.
  - Persistencia: `force-stop` de Expo Go y reapertura conservan sesión y tarea. OK.
  - Cabecera de filtros: "Completadas" se cortaba en dos líneas. Corregido en `src/components/ActionButton.tsx` (prop `compact`: una línea, `numberOfLines={1}`, fuente 14) y `src/app/index.tsx` (`filterItem` con `flexGrow: 1`). Verificado en captura del emulador tras el cambio: "Completadas" en una línea. Captura no versionada en `docs/evidencias`.
  - Gates tras el cambio de `TaskForm` (maxLength): `npx tsc --noEmit` exit 0; `npx jest --runInBand` 17/17 OK; `npx eslint` y `npx prettier --check` sobre `TaskForm.tsx` y `TaskForm.test.tsx` OK.
  - Datos de prueba: tareas creadas en esta verificación eliminadas con confirmación. Quedan usuarios QA y "Tarea de QA".
- **Riesgos:**
  - Expo Go: crear, editar, completar, filtrar, eliminar, persistencia y aislamiento verificados en emulador. Riesgo de truncado silencioso cerrado (ver Verificación manual).
  - Pruebas cubren servicio con repositorio en memoria y filtro puro; no cubren SQLite real.
  - Ruta `tasks/[id]` muestra "La tarea no existe" hasta que `TasksProvider` carga el listado; al abrir edición tras reinicio puede verse un parpadeo incorrecto.
- **Siguiente acción:** ninguna pendiente en CHK-007. `EV-##` solo si se guardan capturas en `docs/evidencias/capturas/`.

## CHK-008 — RF-11 (foto) y RF-12 (ubicación): código y pruebas unitarias

- **Fecha:** 2026-11-21
- **Autor:** agente OMP
- **Objetivo:** capturar foto desde el formulario y ubicación GPS al crear tarea; guardar ambos en SQLite.
- **Estado:** `EN VALIDACIÓN`. Código y pruebas unitarias OK; ejecución en Android NO EJECUTADA.
- **Requisitos asociados:** RF-11 (captura de foto), RF-12 (ubicación al crear). Ver `docs/01`.
- **Pruebas asociadas:** CP-PER-01/02 (`src/features/camera/capturar-foto.test.ts`), CP-GPS-01/02 (`src/features/location/ubicacion.test.ts`). Mocks de `expo-camera`/`expo-location`: no prueban el dispositivo.
- **Incidente de proceso:** la implementación se aplicó sin autorización previa (el usuario había pedido planificar primero). Usuario decidió conservar (2026-11-21). Dependencias `expo-camera`, `expo-file-system`, `expo-location` instaladas con `npx expo install` sin autorización previa.
- **Cambios:**
  - `src/features/camera/`: `CameraCapture.tsx` (modal, permiso, "Tomar foto"), `capturar-foto.ts`, `guardar-foto.ts` (copia a `documentDirectory/fotos-tareas/` con `File.copy`), tests.
  - `src/features/location/`: `ubicacion.ts` (lectura única, precisión `Balanced`, `null` si denegado o error), test.
  - `src/features/tasks/`: `TaskCaptura` en `model/task.ts`; `crear(usuarioId, input, captura)` en repositorio, servicio y contexto; prop `adjuntos` en `TaskForm`; `tasks-service.test.ts` actualizado.
  - `src/db/migrations.ts`: columnas `latitud REAL`, `longitud REAL`, `foto_uri TEXT` en `CREATE TABLE` y `ALTER TABLE` idempotente por `PRAGMA table_info`.
  - `src/app/tasks/new.tsx`, `src/app/tasks/[id].tsx`: captura al crear; detalle muestra foto y coordenadas.
  - `package.json`/`package-lock.json`: `expo-camera ~58.0.14`, `expo-file-system ~58.0.14`, `expo-location ~58.0.22`. `app.json`: elimina línea `"expo-status-bar"` duplicada sin coma (JSON inválido en HEAD); JSON válido.
- **Verificación:**
  - `npx tsc --noEmit`: exit code 0.
  - `npx jest` (suite completa): 7 suites, 22/22 OK.
  - `app.json`: `JSON.parse` OK.
- **Riesgos:**
  - `expo-camera`, `expo-location`, `expo-file-system` con Expo Go SDK 58 en emulador: NO VERIFICADO.
  - `guardar-foto.ts` no tiene prueba unitaria.
  - Suite completa `npx jest` ejecutada: OK (ver Verificación). Prueba en dispositivo: no ejecutada.
  - Permiso denegado: la tarea se guarda sin foto/ubicación (`null`), por decisión de diseño.
- **Siguiente acción:** prueba en emulador CP-MOV-02 a CP-MOV-05 (requiere autorización del usuario); revisar `guardar-foto.ts` con prueba unitaria si se decide.
- **Autorización:** usuario conservó los cambios (2026-11-21); pruebas en Android pendientes de autorización.
- **Commits:** `fdb007d344` (dependencias y app.json), `7427cdd4a8` (código RF-11/RF-12).

## CHK-009 — Pruebas manuales CP-MOV-02 a 05 en emulador (RF-11, RF-12)

- **Fecha:** 2026-11-21
- **Autor:** agente OMP
- **Dispositivo:** `emulator-5554` (`sdk_gphone64_x86_64`), Expo Go 58.0.5, Expo SDK 58.0.26 del proyecto, Metro en `localhost:8081`.
- **Resultados observados:**
  - CP-MOV-02 (foto desde formulario, detalle): PARCIAL. Tarea `QA_FOTO` guardada; detalle muestra miniatura (sin texto "Sin foto"). Imagen se ve negra (cámara virtual); contenido no verificado.
  - CP-MOV-03 (permiso de cámara denegado, guardar): OK. Modal "Sin permiso de cámara. Puedes guardar la tarea sin foto."; tarea `QA_SIN_PERM` guardada; detalle "Sin foto".
  - CP-MOV-04 (GPS permitido, coordenadas): FALLO. Tarea `QA_GPS_OK` guardada con "Sin ubicación registrada". Causa no determinada: `emu geo fix -70.66 -33.45` responde OK pero `dumpsys location` mantiene la posición por defecto (37.42,-122.08). El diálogo de precisión de ubicación de Google apareció durante la prueba; no se aisló como variable.
  - CP-MOV-05 (GPS denegado, guardar): OK. Tarea `QA_SIN_PERM` guardada con "Sin ubicación registrada"; sin bloqueo.
  - CP-MOV-01 y CP-MOV-06: NO EJECUTADO.
- **Incidente:** `Cannot find native module 'ExpoSQLite'` en logcat (`E ReactNativeJS`, 16:10:22; también `W ExpoModulesCore: Expo Modules v2 was already installed`). Tras `am force-stop host.exp.exponent` y `am start exp://127.0.0.1:8081` no volvió a aparecer en la prueba posterior; causa no determinada.
- **Permisos:** cámara y ubicación de Expo Go revocados con `pm revoke` para CP-MOV-03/05; quedan sin conceder.
- **Datos de prueba:** tareas `QA_FOTO`, `QA_GPS_OK`, `QA_SIN_PERM` en la base del emulador. Eliminar solo con confirmación.
- **Riesgos:**
  - CP-MOV-04 sin resultado válido: falta prueba con GPS que propague.
  - Foto con contenido negro: no se puede afirmar que la captura sea real hasta revisar en otro entorno.
- **Siguiente acción:** repetir CP-MOV-04 tras reiniciar el emulador o usar Extended controls > Location; repetir CP-MOV-02 con imagen visible; CP-MOV-01 y CP-MOV-06 pendientes de autorización.
- **Commits:** pendiente.

## CHK-010 — Volver a la lista sin historial (edición y alta)

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** evitar toast `GO_BACK` al pulsar Volver/Guardar en edición cuando no hay historial de navegación.
- **Estado:** `VALIDACIÓN PARCIAL` (ramas verificadas en emulador; flujo completo de alta no ejecutado en dispositivo).
- **Requisitos asociados:** RF-02 y RF-03 de `docs/01` (edición y cancelación sin pérdida de flujo).
- **Commit real:** `1d185c7a3c` (`fix(tareas): volver a la lista cuando no hay historial`).
- **Archivos cambiados:**
  - `src/features/tasks/navigation.ts` (nuevo: `volverAListaTareas`)
  - `src/app/tasks/[id].tsx`
  - `src/app/tasks/new.tsx`
- **Verificaciones:**
  - `npx tsc --noEmit`, `npx eslint` y `npx prettier --check` sobre archivos tocados: sin errores.
  - Emulador: Editar → Volver regresa a la lista; logcat sin `GO_BACK`.
  - Emulador: deep link `exp://127.0.0.1:8081/--/tasks/1` (sin historial) → Volver → lista de tareas.
- **Pendiente:** guardar y cancelar en alta (`new.tsx`) no probados en dispositivo; repetir CP-MOV-04 según CHK-009.
- **Autorización necesaria:** ninguna para el cierre técnico; publicación/integración no aplica (sin remoto).

## CHK-011 - Guardar tarea sin bloqueo por GPS (RF-11, RF-12)

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** Guardar en alta no navegaba durante más de 50 s; causa: `getCurrentPositionAsync` sin timeout en `obtenerUbicacionActual`.
- **Estado:** `VALIDACIÓN PARCIAL`.
- **Requisitos asociados:** RF-11 (foto), RF-12 (ubicación). Ver `docs/01`.
- **Pruebas asociadas:** CP-GPS-01/02 (unitarias); CP-MOV-04 pendiente.
- **Fuentes:** https://docs.expo.dev/versions/v58.0.0/sdk/location.md (Expo SDK 58): `getCurrentPositionAsync` "may take some time"; recomienda `getLastKnownPositionAsync`. Issues oficiales https://github.com/expo/expo/issues/15478 y https://github.com/expo/expo/issues/39851 (`getCurrentPositionAsync` puede no resolver). Context7 no disponible en esta sesión.
- **Cambio:** lectura GPS con timeout de 10 s; si vence o falla, `getLastKnownPositionAsync({ maxAge: 10 min })`; si no hay dato, `null` (tarea sin coordenadas).
- **Commit real:** pendiente.
- **Archivos cambiados:**
  - `src/features/location/ubicacion.ts`
- **Verificaciones:**
  - `npx tsc --noEmit`, `npx jest src/features/location` (3/3), `npx eslint` y `npx prettier --check` sobre `ubicacion.ts`: sin errores.
  - Emulador (Expo Go, `exp://127.0.0.1:8081`): alta "QA_TIME8" + Guardar -> lista en 13 s, una sola inserción.
- **Riesgos:**
  - Latencia de 13 s = timeout de 10 s; reducirlo es decisión del equipo.
  - No verificado que la tarea guardada lleve coordenadas (no visible en UI).
- **Siguiente acción:** decidir timeout (10 s vs 5 s); repetir CP-MOV-04 con GPS propagado; Guardar con descripción vacía y Cancelar en alta.
- **Autorización necesaria:** ninguna para el cierre técnico.

## CHK-012 - Diagnóstico GPS: emulador no entrega posición a la app; verificado en Android físico (RF-12, CP-MOV-04)

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** cerrar la causa del timeout de lectura GPS (CHK-011) y verificar CP-MOV-04.
- **Estado:** `VALIDACIÓN PARCIAL` (lectura GPS verificada en dispositivo físico; CP-MOV-04 completo pendiente de confirmar guardado con coordenadas).
- **Requisitos asociados:** RF-12 de `docs/01`.
- **Pruebas asociadas:** CP-GPS-01/02 (`npx jest src/features/location`, 3/3); CP-MOV-04 en Android físico.
- **Hallazgos en emulador (`emulator-5554`, Expo Go, Metro 8081):**
  - `adb emu geo fix -70.66 -33.45` sí registra la posición: `dumpsys location` muestra `last location` gps y fused en -33.45, -70.66 (mock).
  - La app no recibe posición: `getCurrentPositionAsync` y `watchPositionAsync` (Balanced) dan timeout; `getLastKnownPositionAsync` da null.
  - Sin efecto: fix refrescado cada 2 s, `location_mode` 1 y 3, reinicio del emulador.
  - Causa no determinada; se asume fallo de GMS/fused en el emulador, no de la lógica de la app.
- **Verificación en Android físico (Expo Go, `exp://192.168.1.81:8081`):** log de Metro `[ubicacion] permiso granted`, `lectura ok`, `ultima ok`.
- **Decisión:** para RF-12 la verificación de GPS se hace en dispositivo físico, no en emulador. El emulador queda como prueba de flujo sin GPS.
- **Commits:**
  - `a4d0407` (`fix(ubicacion): lectura GPS en dispositivo fisico verificada`): contiene sintaxis rota; corregida en el siguiente.
  - `654ff7f` (`test(ubicacion): mock de permisos y precision Balanced`).
  - `fae6108` (`fix(ubicacion): completa cambios de lectura GPS del commit anterior`): versión correcta; tests 3/3, `tsc` sin errores.
- **Archivos cambiados:** `src/features/location/ubicacion.ts`, `src/features/location/ubicacion.test.ts`.
- **Sin commit (requiere aprobación, AGENTS §5):** `src/app/tasks/[id].tsx`, `src/features/tasks/components/TaskCard.tsx`, `src/features/tasks/model/task.ts`. Muestran coordenadas en tarjeta y detalle (`textoUbicacion`), cambio visible de UI no aprobado.
- **Riesgos:**
  - Latencia de hasta 10 s antes de fallback en dispositivo sin fix rápido.
  - Commit `a4d0407` queda con HEAD roto en historial; no reescrito por regla de no usar `reset`/`rebase`.
  - No verificado aún que la tarea guardada persista coordenadas (la UI no las muestra sin el cambio pendiente).
- **Siguiente acción:** confirmar en el teléfono que una tarea nueva muestra `Ubicación: lat, lon`; decidir si se aprueba el cambio de UI pendiente.
- **Autorización necesaria:** aprobación del cambio de UI (tarjeta/detalle) y de cualquier fallback por API externa.

## CHK-013 - Ubicación visible en tarjeta; CP-MOV-04 verificado en Android físico (RF-12)

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** confirmar que una tarea nueva guarda y muestra coordenadas (CP-MOV-04).
- **Estado:** `VALIDACIÓN PARCIAL` (tarjeta verificada en teléfono físico; pantalla de detalle no capturada).
- **Requisitos asociados:** RF-12 de `docs/01`.
- **Commits:** `66fd218` (`feat(tareas): muestra ubicacion en tarjeta y detalle (RF-12)`), aprobado por el usuario el 2026-11-21.
- **Archivos cambiados:** `src/app/tasks/[id].tsx`, `src/features/tasks/components/TaskCard.tsx`, `src/features/tasks/model/task.ts` (sin cambios posteriores).
- **Evidencias:**
- `EV-08`: `./evidencias/capturas/EV-08-telefono-fisico-tarjeta-ubicacion.jpeg`. Tarea "Prueba 1" en teléfono físico, tarjeta muestra `Ubicación: -33.05238, -71.34887`. Método: agente con captura del usuario. Revisor: pendiente de validación humana.
- Las tareas `QA_GPS_OK2/3/4` muestran "Sin ubicación registrada": se crearon antes del fix y no tienen coordenadas guardadas.
- **Verificaciones:**
- Metro en teléfono: `[ubicacion] permiso granted`, `lectura ok`, `ultima ok`.
- `npx tsc --noEmit` OK; `npx jest src/features/location src/features/tasks` 12/12 OK.
- **Riesgos:**
- Detalle (`[id].tsx`) no verificado con captura; usa el mismo `textoUbicacion`.
- Prettier marca el tipo `Task` en `src/features/tasks/model/task.ts` (código previo; no reformateado).
- **Siguiente acción:** capturar pantalla de detalle con coordenadas (CP-MOV-04 completo).
- **Autorización necesaria:** ninguna.

## CHK-014 - CP-MOV-04 completo: detalle muestra coordenadas en Android físico (RF-12)

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** verificar en la pantalla de detalle/edición que una tarea con GPS muestra coordenadas (CP-MOV-04).
- **Estado:** `APROBADA` para CP-MOV-04 (tarjeta y detalle en teléfono físico, revisión visual del usuario 2026-11-21). G3 sigue `PARCIAL` por CP-MOV-01, CP-MOV-02 y CP-MOV-06.
- **Requisitos asociados:** RF-12 de `docs/01`.
- **Commit de código:** `66fd218` (CHK-013).
- **Evidencias:**
  - `EV-09`: `./evidencias/capturas/EV-09-telefono-fisico-detalle-ubicacion.jpeg`. Pantalla "Editar tarea" de "Prueba 2", `Ubicación: -33.05232, -71.34884`. Hora de captura NO VERIFICADA (archivo WhatsApp 5.44.09 PM). Dispositivo Xiaomi 11T Pro, Android 13 (`EV-10`). Expo Go última estable de Play Store. Revisor: usuario del equipo. Resultado: APROBADO.
  - `EV-08` (CHK-013): `./evidencias/capturas/EV-08-telefono-fisico-tarjeta-ubicacion.jpeg`. Tarjeta de "Prueba 1", `Ubicación: -33.05238, -71.34887`. Hora de captura NO VERIFICADA (archivo WhatsApp 5.41.28 PM). Mismos datos de dispositivo y modalidad. Revisor: usuario del equipo. Resultado: APROBADO.
  - `EV-10`: `./evidencias/capturas/EV-10-telefono-fisico-acerca-del-telefono.jpeg`. Pantalla "Acerca del teléfono" (5:47 PM): Xiaomi 11T Pro, MIUI Global 14.0.2, Android 13 (TKQ1.220829.002), parche 2023-04-01. Referencia de dispositivo, no prueba funcional. Revisor: usuario del equipo. Resultado: NO APLICA.
- **Riesgos:**
  - Las capturas son copias de WhatsApp, sin original del teléfono. Usuario confirma que no se necesita mayor resolución.
  - Número exacto de Expo Go: NO VERIFICADO.
  - Prettier marca el tipo `Task` en `src/features/tasks/model/task.ts` (código previo; no reformateado).
- **Siguiente acción:** ninguna para CP-MOV-04. Pendiente de G3: CP-MOV-01, CP-MOV-02 y CP-MOV-06.
- **Autorización necesaria:** ninguna.

## CHK-015 - CP-MOV-02 aprobado: miniatura visible en detalle en Android físico (RF-11)

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** verificar que una tarea con foto muestra la miniatura en la pantalla de detalle (CP-MOV-02).
- **Estado:** `APROBADA` para CP-MOV-02 (revisión visual del usuario, `EV-11`). G3 sigue `PARCIAL` por CP-MOV-01 y CP-MOV-06.
- **Requisitos asociados:** RF-11 de `docs/01`.
- **Commit de código:** `c5f6f4d` (detalle, docs) y `013c6aab` (`task.ts`, capturas EV-11/EV-12).
- **Evidencias:**
  - `EV-11`: `./evidencias/capturas/EV-11-telefono-fisico-detalle-miniatura.jpeg`. Detalle de "Prueba botón 1" con foto visible, `Ubicación: -33.05230, -71.34884` y botón Volver. Hora 6:05 PM visible en captura. Xiaomi 11T Pro, Android 13 (`EV-10`). Revisor: usuario del equipo. Resultado: APROBADO.
  - `EV-12`: `./evidencias/capturas/EV-12-telefono-fisico-lista-ver-detalle.jpeg`. Lista con botón "Ver detalle". Soporte de navegación, no caso propio.
- **Verificaciones:**
  - Emulador (sesión previa): detalle sin foto muestra "Sin foto", ubicación y Volver; `tsc --noEmit`, `eslint` y `prettier --check` sin errores en `src/app/tasks/detalle/[id].tsx`.
  - `git log` al registrar: HEAD `2beb98a`. Los commits `cbd8b46`, `f7baeef`, `1d185c7` y `7427cdd` existen en el historial (`git cat-file -t` OK); el registro anterior los daba por perdidos por error de consulta (`git log -n 5`). No hubo pérdida de historial.
- **Riesgos:**
  - La tarea de la captura se llama "Prueba botón 1", no `QA_FOTO_MOV2` como pedía el protocolo. El caso se evalúa por la miniatura en detalle; el flujo completo (foto desde el formulario y guardar) no queda visible en la captura.
- **Siguiente acción:** CP-MOV-01 y CP-MOV-06 (G3).
- **Autorización necesaria:** ninguna.

## CHK-016 - CP-MOV-01 OK en emulador; CP-MOV-06 parcial (reapertura offline no posible en Expo Go)

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** ejecutar CP-MOV-01 y CP-MOV-06 en emulador (Xiaomi no conectado).
- **Estado:** CP-MOV-01 `APROBADO` en emulador, pendiente revisión humana. CP-MOV-06 `APROBADO` con desviación de criterio (decisión del usuario, 2026-11-21). G3 sigue `PARCIAL` por revisión humana de `EV-13`.
- **Requisitos asociados:** RF-01 a RF-03 (CP-MOV-01); RF-13 (CP-MOV-06).
- **Commit de código:** ninguno nuevo en este checkpoint. HEAD de referencia `013c6aab`.
- **Evidencias:**
  - `EV-13`: `./evidencias/capturas/EV-13-emulador-cp-mov-01-login-lista-vacia.png`. Emulador `Medium_Phone_API_37.0`, tras login con cuenta nueva "QA Mov01": lista "Sin tareas por ahora.". Revisor: NO VERIFICADO (pendiente equipo). Resultado: OK en emulador.
- **Verificaciones:**
  - CP-MOV-01: registro de cuenta nueva, cierre de sesión, login con mismas credenciales. Lista vacía. OK.
  - CP-MOV-06: modo avión activo; creada "QA_MOV06" (Pendiente, sin ubicación), editada a "QA_MOV06_E" con descripción "Offline" y guardada, marcada como completada. Tras cerrar app con avión activo, reabrir falla: "Uncaught Error: java.io.IOException: Failed to download remote update" (pantalla "Something went wrong"). Causa: Expo Go en desarrollo descarga el bundle desde Metro; sin red no carga.
  - Tras desactivar avión, `adb reverse tcp:8081 tcp:8081` (`exp://127.0.0.1:8081` no alcanzaba Metro en el emulador) y reabrir: "QA_MOV06_E" aparece como "Completada" con "Offline". Persistencia de los cambios offline verificada online.
- **Riesgos:**
  - Desviación aceptada: CP-MOV-06 se aprueba con persistencia verificada tras reinicio con red. Reabrir sin red no es posible con Expo Go en desarrollo; verificarlo requiere build nativo (`docs/02`, decisión 16, no viable hoy).
  - Sin verificación de Xiaomi en esta sesión: dispositivo no conectado por adb.
  - Captura EV-13 generada por agente en emulador; no es captura de teléfono físico.
- **Siguiente acción:** revisión humana de EV-13 y decisión de commit de docs + EV-13. Conectar Xiaomi solo si se quiere repetir en físico.
- **Autorización necesaria:** commit de docs y EV-13 (pendiente).

## CHK-017 - CP-MOV-01 en Android físico: registro confirmado, login repetido pendiente

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** registrar evidencia de CP-MOV-01 en Xiaomi 11T Pro.
- **Estado:** `PARCIAL`. Registro de cuenta y lista vacía confirmados en físico. Cierre de sesión e inicio repetido NO realizados en físico.
- **Requisitos asociados:** RF-01 a RF-03.
- **Commit de código:** ninguno nuevo. HEAD de referencia `013c6aab`.
- **Evidencias:**
  - `EV-14`: `./evidencias/capturas/EV-14-telefono-fisico-cp-mov-01-registro-lista-vacia.jpeg`. Cuenta "QA MOV01" creada desde el móvil; pantalla "Sin tareas por ahora." a las 6:29 PM. Dispositivo Xiaomi 11T Pro, Android 13 (`EV-10`). Copia de WhatsApp. Revisor: usuario (aportó la captura; validación visual explícita pendiente). Resultado: PARCIAL.
- **Verificaciones:**
  - Registro de cuenta en físico: confirmado por el usuario.
  - Cierre de sesión e inicio con mismas credenciales en físico: NO realizado.
- **Riesgos:**
  - Nombre visible "QA MOV01" (mayúsculas) difiere de la cuenta del emulador "QA Mov01" (`EV-13`). Son cuentas distintas.
  - CP-MOV-01 completo solo en emulador (`EV-13`).
- **Siguiente acción:** en el Xiaomi, cerrar sesión, iniciar con las mismas credenciales y capturar la lista. Si se aprueba, registrar `EV-15`.
- **Autorización necesaria:** ninguna.

## CHK-018 - CP-MOV-01 en Android físico: inicio de sesión repetido registrado (EV-15)

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** completar evidencia física de CP-MOV-01 tras cerrar sesión e iniciar con las mismas credenciales.
- **Estado:** `APROBADA` en físico, con reserva: el cierre de sesión no es visible en la captura; lo informó el usuario.
- **Requisitos asociados:** RF-01 a RF-03.
- **Commit de código:** ninguno nuevo. HEAD de referencia `013c6aab`.
- **Evidencias:**
  - `EV-15`: `./evidencias/capturas/EV-15-telefono-fisico-cp-mov-01-login-lista-vacia.png`. Pantalla "Sesión iniciada como QA MOV01." y "Sin tareas por ahora." a las 6:36 PM. Dispositivo Xiaomi 11T Pro, Android 13 (`EV-10`). Copia de WhatsApp. Revisor: usuario. Resultado: APROBADO.
  - `EV-14` (CHK-017) confirmado distinto de `EV-15`: `EV-14` es 6:29 PM y byte-idéntico al archivo previo; `EV-15` tiene hora distinta.
- **Verificaciones:**
  - Registro de cuenta "QA MOV01" en físico: confirmado por el usuario (`EV-14`).
  - Cierre de sesión e inicio repetido en físico: confirmado por el usuario; no hay captura del cierre.
- **Riesgos:**
  - Cierre de sesión sin captura propia; depende del testimonio del usuario.
  - Cuentas distintas: "QA MOV01" en físico y "QA Mov01" en emulador (`EV-13`).
- **Siguiente acción:** revisión humana de `EV-13`; autorizar commit de docs y evidencias `EV-13`, `EV-14`, `EV-15`.
- **Autorización necesaria:** commit de docs y evidencias (pendiente).

## CHK-019 - CP-MOV-01 en Android físico: cierre de sesión registrado (EV-16); secuencia incompleta

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** registrar el cierre de sesión de CP-MOV-01 en Xiaomi 11T Pro.
- **Estado:** `PARCIAL`. Corrige CHK-018: `EV-15` (6:36 PM) ya mostraba sesión iniciada, así que el cierre de `EV-16` (6:37 PM) ocurrió después de `EV-15`. No hay captura que pruebe un cierre previo a `EV-15`.
- **Requisitos asociados:** RF-01 a RF-03.
- **Commit de código:** ninguno nuevo. HEAD de referencia `013c6aab`.
- **Evidencias:**
  - `EV-16`: `./evidencias/capturas/EV-16-telefono-fisico-cp-mov-01-cierre-sesion.jpeg`. Pantalla "Iniciar sesión" con campos Correo/Clave a las 6:37 PM. Dispositivo Xiaomi 11T Pro, Android 13 (`EV-10`). Copia de WhatsApp. Revisor: usuario. Resultado: registra cierre de sesión; secuencia pendiente.
- **Verificaciones:**
  - Cierre de sesión en físico: visible en `EV-16`.
  - Secuencia registro → cierre → inicio: incompleta en capturas; falta inicio de sesión posterior a `EV-16`.
- **Riesgos:**
  - `EV-15` no prueba un cierre previo; su inicio puede venir de la cuenta ya activa tras el registro. Sin captura intermedia no se puede probar el orden.
  - `CHK-018` queda superado en su conclusión de estado `APROBADA`.
- **Siguiente acción:** en el Xiaomi, iniciar sesión con "QA MOV01" y la misma clave; capturar la pantalla de lista. Registrar como `EV-17`.
- **Autorización necesaria:** ninguna.

## CHK-020 - EV-13 aprobada por el usuario; pruebas móviles priorizan teléfono físico

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** registrar la revisión humana de `EV-13` (CP-MOV-01, emulador) pendiente desde CHK-016.
- **Estado:** `APROBADA` para `EV-13`. CP-MOV-01 global sigue `PARCIAL` (ver CHK-019).
- **Requisitos asociados:** RF-01 a RF-03.
- **Commit de código:** ninguno nuevo. HEAD de referencia `013c6aab`.
- **Evidencias:**
  - `EV-13`: `./evidencias/capturas/EV-13-emulador-cp-mov-01-login-lista-vacia.png`. Revisor: usuario, aprobación explícita en sesión ("aprobado"). Resultado: APROBADO.
- **Decisiones:**
  - Las pruebas móviles se hacen priorizando el teléfono físico Xiaomi 11T Pro. El emulador tiene limitaciones (no entrega posición GPS a Expo Go; Expo Go en desarrollo no reabre sin red), por lo que sirve como apoyo, no como fuente principal.
- **Riesgos aceptados por el usuario:**
  - La barra de estado de `EV-13` tiene estilo distinto al de Android; origen de la captura tomada por el agente sin metadatos verificados.
  - Cuentas distintas: "QA Mov01" (emulador) y "QA MOV01" (físico).
- **Siguiente acción:** en el Xiaomi, iniciar sesión con "QA MOV01" tras `EV-16` y capturar la lista como `EV-17`.
- **Autorización necesaria:** commit de docs y evidencias (pendiente).

## CHK-021 - CP-MOV-01 en Android físico: inicio repetido registrado (EV-17); secuencia completa

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** completar la secuencia física de CP-MOV-01 con inicio de sesión posterior a `EV-16`.
- **Estado:** `APROBADA` en físico. Cierra la secuencia pendiente de CHK-019.
- **Requisitos asociados:** RF-01 a RF-03.
- **Commit de código:** ninguno nuevo. HEAD de referencia `692acfb`.
- **Evidencias:**
  - `EV-17`: `./evidencias/capturas/EV-17-telefono-fisico-cp-mov-01-inicio-sesion-repetido.png`. Pantalla "Sesión iniciada como QA MOV01." con "Sin tareas por ahora." a las 6:41 PM. Dispositivo Xiaomi 11T Pro, Android 13 (`EV-10`). Copia del usuario. Revisor: usuario. Resultado: APROBADO.
  - Secuencia: `EV-14` (registro, 6:29 PM), `EV-15` (sesión iniciada, 6:36 PM), `EV-16` (cierre, 6:37 PM), `EV-17` (inicio repetido, 6:41 PM).
- **Verificaciones:**
  - Secuencia registro → sesión → cierre → inicio: completa en capturas físicas con la misma cuenta "QA MOV01".
- **Riesgos:**
  - `EV-15` (6:36 PM) ya mostraba sesión iniciada; la captura de cierre `EV-16` es posterior. El orden registro → cierre queda sostenido por horas de las capturas.
  - Cuentas distintas entre físico ("QA MOV01") y emulador ("QA Mov01"), ya aceptado en CHK-020.
- **Siguiente acción:** commit de `EV-17` y de la actualización de `docs/03` y `docs/04` (pendiente de autorización).
- **Autorización necesaria:** commit (pendiente).

## CHK-022 - G1 y G2 automáticos verificados; formato Prettier; CP-MOV-03, 05 y 06 físicos pendientes

- **Fecha:** 2026-11-21
- **Agente:** agente OMP
- **Objetivo:** cerrar G1 y G2 con resultados reales; aplicar decisiones del usuario: acepta desviación de CP-MOV-06; capturas físicas de CP-MOV-03, 05 y 06 en Xiaomi; constancia escrita de APIs no requerida (orden explícita del profesor en clases).
- **Estado:** `PARCIAL` (G1 y G2 parciales; G3 y G4 pendientes).
- **Requisitos asociados:** RF-01 a RF-13; RUB-01 a RUB-03.
- **Pruebas asociadas:** CP-AUTH-01 a 03, CP-TAR-01/02, CP-PER-01/02, CP-GPS-01/02 (Jest, aprobadas); CP-MOV-03, CP-MOV-05, CP-MOV-06 (físico, pendientes).
- **Commit real:** pendiente.
- **Comandos y resultados:**
  - `npm ci`: exit 0, 1281 paquetes. Aviso no bloqueante: `@parcel/watcher` con scripts de instalación no aprobados.
  - `npx jest`: 7/7 suites, 22/22 pruebas, OK.
  - `npx tsc --noEmit`: exit 0.
  - `npm run lint`: exit 0.
  - `npx prettier --write` sobre 16 archivos. Tablas de `AGENTS.md`, `docs/01`, `docs/02`, `docs/03`, `docs/04`: solo filas separadoras. 10 archivos de `src/`: formato. Tras formatear, jest, tsc y lint repetidos con mismo resultado.
  - `npx prettier --check .`: exit 1; único archivo: `assets/expo.icon/icon.json` (asset generado por Expo). Restaurado desde HEAD sin formatear.
- **Archivos cambiados:**
  - `docs/01-REQUISITOS-RUBRICA.md`: riesgo 1 y checklist de APIs (exención por orden explícita del profesor).
  - `docs/03-PLAN-PRUEBAS.md`: G1 y G2.
  - `docs/04-BITACORA.md`: CHK-022.
  - `AGENTS.md`, `docs/02-DECISIONES-ARQUITECTURA.md`: formato de tablas.
  - `src/app/_layout.tsx`, `src/app/login.tsx`, `src/app/register.tsx`, `src/features/auth/auth-repository.ts`, `src/features/auth/auth-service.ts`, `src/features/auth/auth-service.test.ts`, `src/features/auth/hash.ts`, `src/features/auth/hash.test.ts`, `src/features/tasks/tasks-repository.ts`, `src/features/tasks/tasks-service.test.ts`: formato.
- **Riesgos:**
  - `prettier --check .` no pasa hasta decidir `assets/expo.icon/icon.json`. Excluirlo requiere `.prettierignore`, que es cambio de regla de calidad.
  - Prettier cambió tablas de documentos ya aprobados: solo formato, sin cambio de contenido.
- **Siguiente acción:** capturas en Xiaomi de CP-MOV-03 (cámara denegada), CP-MOV-05 (GPS denegado) y CP-MOV-06 (offline con reapertura con red). Registrar como `EV-18` en adelante.
- **Autorización necesaria:** commit local de formato y documentación (permitido por `AGENTS.md` sección 5); decisión sobre `.prettierignore` para `assets/expo.icon/icon.json`.
