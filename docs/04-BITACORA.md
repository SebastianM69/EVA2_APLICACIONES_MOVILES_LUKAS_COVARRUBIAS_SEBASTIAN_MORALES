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
- **Decisiones pendientes:** ejecutar la app en emulador requiere elegir Expo Go o dev build (`expo run:android` genera carpeta `android/` nativa). Pendiente decisión del usuario.

