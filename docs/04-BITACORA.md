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
- **Estado:** `EN VALIDACIÓN` (captura tomada; revisión humana pendiente).
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
  - `EV-01` (`docs/evidencias/capturas/EV-01-expo-go-tareas-vacias.png`): versionada; revisión humana pendiente.
  - `docs/evidencias/capturas/EV-02-expo-go-titulo-tareas.png`: reemplazada por la captura de cabecera `Inicio` (12:56). La captura anterior (spinner de carga, 12:40) se descartó y se conservó fuera del repo.
- **Decisiones:** decisión 16 de `docs/02` confirmada por el usuario (2026-11-21). Su documentación se commitea con CHK-004 y CHK-005.
- **Siguiente acción:** revisión humana de `EV-01` y `EV-02`; commit documental pendiente de autorización.
- **Autorización:** el usuario autorizó RF-01 a RF-03 (autenticación local con `expo-sqlite` y `expo-crypto`) el 2026-11-21, usando documentación oficial Expo SDK 58 como fuente mientras Context7 no esté configurado. Condiciones: revisión humana de `EV-01` y `EV-02` antes de avanzar; commit documental antes de implementar.

