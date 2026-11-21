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

