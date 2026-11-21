# AGENTS.md — Contrato de gobernanza para agentes de desarrollo

> **Proyecto:** To-Do móvil ampliada — Desarrollo de Aplicaciones Móviles, Unidad 2
> **Ubicación:** raíz del repositorio Git
> **Versión documental:** 1.0 — reglas de desarrollo aprobadas por el usuario el 2026-11-21
> **Estado:** reglas aprobadas; implementación **en curso**. Base de código y ejecución Expo Go verificadas (ver `docs/04`, CHK-003 y CHK-004).
> **Alcance inmediato:** el indicado en el último checkpoint de `docs/04`. Etapas nuevas requieren autorización expresa (sección 5).

## 1. Propósito y aplicación

El repositorio Git y sus documentos versionados son la fuente de verdad. Un agente debe leer este archivo y los documentos de `docs/` **antes de modificar cualquier archivo**.

El permiso para ejecutar una tarea no implica permiso para cambiar requisitos, aceptar riesgos, ampliar alcance, integrar ramas o publicar resultados.

### 1.1. Preflight obligatorio

Antes de la primera tarea ejecutable, el agente declara, con observaciones reales:

1. **Repositorio:** ruta relativa de la raíz, rama, último commit y cambios preexistentes. Si no hay `.git`, declarar `REPOSITORIO_NO_INICIALIZADO`.
2. **Herramientas:** lectura/escritura, terminal, Git, Context7 y documentación oficial. Cada una: `DISPONIBLE`, `NO DISPONIBLE` o `NO VERIFICADO`.
3. **Entorno:** sistema operativo, Node/npm, Expo y acceso a emulador o dispositivo Android. No inventar versiones.
4. **Evidencia visual Android:** si el agente puede capturar la pantalla real. Cada capacidad: `DISPONIBLE`, `NO DISPONIBLE` o `NO VERIFICADO`.
5. **Alcance y permisos:** tarea y rama autorizadas. No inferir permisos de publicación, instalación ni operaciones destructivas.
6. **Carga de reglas:** confirmar que se leyó este `AGENTS.md` desde el repositorio real.

**Context7 es requisito obligatorio.** Si no está disponible, registrar `CONTEXT7_NO_DISPONIBLE` y no comenzar tareas de APIs, versiones o dependencias que lo requieran.

### 1.2. Fuentes del proyecto

1. [Requisitos y rúbrica](./docs/01-REQUISITOS-RUBRICA.md): qué construir, criterios y entregables.
2. [Decisiones y arquitectura](./docs/02-DECISIONES-ARQUITECTURA.md): cómo organizar el proyecto y decisiones aprobadas.
3. [Plan de pruebas](./docs/03-PLAN-PRUEBAS.md): casos de prueba, gates académicos y evidencias.
4. [Bitácora y checkpoints](./docs/04-BITACORA.md): estado real, bloqueos y pendientes.
5. [README](./README.md): instalación, alcance y orientación al evaluador.

Los PDF del enunciado (`Evaluación_U2.pdf` y `Rúbrica_U2.pdf`) son fuentes académicas, no están versionados en el repositorio y no tienen ruta absoluta en esta documentación.

### 1.3. Precedencia y contradicciones

1. Requisitos académicos aplicables y cambios del docente comunicados al equipo.
2. Decisiones aprobadas por el equipo en `docs/02-DECISIONES-ARQUITECTURA.md`.
3. Este `AGENTS.md`.
4. Documentos especializados (`docs/01`, `docs/03`).
5. Bitácora e información histórica.

**Contradicción conocida y aceptada:** el enunciado exige Ionic + Capacitor; el equipo aprobó React Native + Expo. Queda registrada como riesgo en `docs/01` y `docs/02`. No se reabre sin autorización.

Si aparece una contradicción material nueva: detener únicamente el trabajo afectado, conservar los cambios existentes y presentar el conflicto con alternativas. No actualizar documentación para encubrir una incompatibilidad.

## 2. Línea base congelada

| Área | Decisión aprobada que no puede cambiarse sin autorización |
|---|---|
| Framework | **React Native + Expo + TypeScript en modo estricto** (`"strict": true`). |
| Navegación | **Expo Router con Stack**, no Tabs. |
| Estilos | **StyleSheet + tokens** en `src/theme/tokens.ts`. |
| Arquitectura | **Modular por funcionalidades** (`src/features/auth`, `tasks`, `camera`, `location`), con `src/db` y `src/components`. |
| Estado | **Context + `useReducer`** para tareas y sesión; **`useState` local** para formularios y filtros. Contadores y filtros derivados, sin estado duplicado. |
| Persistencia | **`expo-sqlite` local**. Sin servidor. Sin API externa. |
| Autenticación | **Local**: registro y login contra SQLite; clave con hash SHA-256 + salt (`expo-crypto`). |
| Periféricos | **`expo-camera`** (una foto por tarea) y **`expo-location`** (una lectura al crear tarea). Permisos solicitados al ejecutar la acción, nunca al abrir la app. |
| Alcance funcional | RF-01 a RF-13 de `docs/01-REQUISITOS-RUBRICA.md`. |
| Calidad | TypeScript estricto, ESLint, Prettier, Jest con `jest-expo`, React Native Testing Library. |
| Git | Repositorio local nuevo, rama `main`, sin remoto. |

**Prohibido sin aprobación expresa:** sustituir tecnologías, alterar navegación, introducir funcionalidades no solicitadas, añadir bibliotecas, actualizar versiones, crear capas arquitectónicas innecesarias, modificar pruebas para hacerlas pasar, añadir servicios web o APIs externas.

**Versiones:** no fijar a mano. Instalar con `npx expo install <paquete>` y verificar con `npx expo install --check`. Referencia de la línea base EVA1 (no es una aprobación para EVA2): Expo `~58.0.22`, React `19.3.0`, React Native `0.88.1`, Expo Router `~58.0.29`, Jest `~30.5.2`, `jest-expo` `~58.0.13`, RNTL `^14.1.0`. Confirmar con Context7 antes de usarlas.

## 3. Context7 obligatorio

Cuando una tarea involucre una API, biblioteca, dependencia, configuración o patrón dependiente de versión, el agente **debe consultar Context7 antes de implementar o corregir**.

1. Identificar biblioteca, funcionalidad y versión objetivo.
2. Resolver el identificador en Context7 y elegir la referencia oficial.
3. Consultar la API o configuración concreta.
4. Comparar con el SDK y las versiones efectivas del repositorio; no mezclar versiones incompatibles.
5. Registrar: biblioteca/versión, asunto, fuente devuelta, fecha y conclusión.
6. Aplicar cambios solo dentro de un alcance autorizado.

Si Context7 no responde o no tiene la versión requerida: registrar `CONTEXT7_NO_DISPONIBLE` o `CONTEXT7_NO_VERIFICADO`, contrastar con documentación oficial como insumo adicional y **bloquear** la implementación dependiente. No afirmar que se usó una herramienta que no está disponible.

## 4. SOLID aplicado sin sobreingeniería

- **S:** separar presentación, estado/lógica de tareas, validaciones y acceso a SQLite.
- **O:** preferir composición sobre reescrituras de componentes estables.
- **L:** aplicar solo cuando exista sustituibilidad real (por ejemplo, un hook de permisos con mock en pruebas).
- **I:** props y contratos específicos para cada consumidor.
- **D:** separar reglas de detalles solo cuando exista acoplamiento real; hooks y composición suelen bastar.

**No crear** servicios, clases, repositorios, inyección de dependencias ni interfaces redundantes sin un problema concreto.

## 5. Autonomía

**Sin nueva aprobación, dentro de la tarea autorizada:** leer documentación y repositorio; implementar la modificación acordada; corregir problemas menores; añadir o ajustar pruebas de comportamiento aprobado; actualizar documentación afectada; crear commits **locales** según la política Git.

**Requiere aprobación expresa:** cambiar alcance o arquitectura; agregar pantallas; alterar diseño funcional; introducir, instalar o actualizar dependencias; cambiar gestor de paquetes; modificar contratos; alterar pruebas o reglas de calidad; operaciones Git destructivas; fusionar o publicar; modificar datos ajenos a la tarea.

## 6. Política Git

1. Antes de modificar: comprobar rama, estado del árbol y cambios preexistentes.
2. Rama de trabajo: `main` mientras no existan ramas de tarea. Sin remoto.
3. Versionar solo archivos de la tarea autorizada; inspeccionar `git diff --cached --stat` antes de cada commit.
4. Commits con Conventional Commits en español: `docs:`, `feat:`, `test:`, `chore:`, `fix:`. Asunto descriptivo y cuerpo con requisito o propósito.
5. **No hacer:** `push`, `merge`, `rebase` de historial compartido, `push --force`, `reset --hard`, `clean` destructivo, borrado de ramas compartidas, sobrescritura de trabajo ajeno.
6. Versionar `package-lock.json` cuando exista. Excluir `node_modules`, cachés, `.expo/`, `dist/`, `.env*.local` y secretos (ver `.gitignore`).
7. Antes de integrar: resumen de cambios, commits reales, pruebas y pendientes. Solo el equipo autoriza integración o publicación.

## 7. Recuperación: diagnóstico y máximo dos intentos

**Secuencia:** detectar → conservar evidencia → identificar alcance y causa probable → evaluar riesgos → corregir solo si está autorizado → repetir comprobación → documentar.

| Clase de problema | Respuesta |
|---|---|
| Menor (formato, tipado, importación localizada) | Diagnóstico y corrección local dentro de la tarea. |
| Moderado (prueba o componente fallido) | Hasta **dos intentos correctivos** por el mismo defecto, con pruebas entre intentos. |
| Ambiental (herramienta, permisos, dispositivo) | Diagnóstico no destructivo; no modificar configuración global sin autorización. |
| Crítico (integridad, seguridad, pérdida de trabajo) | **Detener de inmediato**; preservar evidencia; pedir decisión. |
| Arquitectónico o de dependencia | **Detener antes de modificar**; presentar alternativas. |

Si dos correcciones no resuelven la falla: estado **BLOQUEADO**. No reiniciar el ciclo con otro nombre ni debilitar pruebas.

**Informe de bloqueo mínimo:** ID, estado, fecha, contexto, error observable, evidencia, causa confirmada o hipótesis, intentos y resultados, impacto, archivos afectados, alternativas, recomendación y autorización requerida.

## 8. Gates de calidad por tarea (GA)

| Gate | Verificación | Salida requerida |
|---|---|---|
| **GA-0 — Alcance** | Tarea autorizada, requisitos y decisiones comprobados. | Sin contradicciones o tarea **BLOQUEADA**. |
| **GA-1 — Calidad estática** | TypeScript estricto, ESLint, Prettier. | Resultados reales. |
| **GA-2 — Arquitectura/SOLID** | Modularidad, responsabilidades, sin sobreingeniería. | Revisión documentada. |
| **GA-3 — Pruebas automatizadas** | Jest/`jest-expo` y RNTL para lógica e interacciones afectadas. | Resultados reales. |
| **GA-4 — Android/UX** | Navegación, teclado, formularios, permisos y apariencia en Android real o emulador. | Evidencia auténtica y registro, o `NO EJECUTADO`/`BLOQUEADO`. Nunca aprobado por mocks. |
| **GA-5 — Documentación/Git** | Documentos actualizados, enlaces relativos, sin rutas absolutas, diff y estado Git. | Entrega rastreable. |

**Mínimo por tipo de tarea:** documentación → GA-0 y GA-5; lógica → GA-0, GA-1, GA-2, GA-3, GA-5; pantallas, navegación o formularios → GA-0 a GA-5; cierre de entrega → todos más los gates académicos de `docs/03`.

### 8.1. Evidencias visuales

1. Origen: capturas de la aplicación real en Android físico o emulador. Un mock, preview o imagen generada no es evidencia de ejecución móvil.
2. Sin falsificación: no inventar, regenerar con IA ni reemplazar originales. Recortes o anotaciones se identifican como derivados.
3. Trazabilidad: ID `EV-##`, casos `CP-##`/`CP-MOV-##`, `RF-##`, `RUB-##`, método (agente/humano), fecha, dispositivo, versión Android, modalidad Expo, commit, pasos, esperado/observado, ruta relativa, revisor y resultado. Dato faltante: `NO VERIFICADO`.
4. Ruta planificada: `./docs/evidencias/capturas/`. No enlazar imágenes que aún no existan.
5. Alcance: operaciones como editar o eliminar requieren secuencia antes/después. TalkBack, tamaño táctil y gestos requieren observación manual registrada.
6. Cierre: solo el equipo valida visualmente cada captura.

### 8.2. Definition of Done

Una tarea queda **APROBADA** cuando: alcance autorizado; anti-drift y SOLID revisados; Context7 consultado o su falta declarada; verificaciones y pruebas aplicables aprobadas; documentación y enlaces actualizados; evidencia Android auténtica revisada por una persona si el gate la exige; sin defectos críticos conocidos; diff y resultados entregados.

Estados de prueba: `NO EJECUTADO`, `APROBADO`, `FALLIDO`, `BLOQUEADO`, `NO APLICA` (con justificación). Estados de trabajo: `PENDIENTE`, `EN DESARROLLO`, `EN VALIDACIÓN`, `VALIDACIÓN PARCIAL`, `BLOQUEADA`, `APROBADA`.

No afirmar `APROBADA` si falta una comprobación obligatoria: usar `VALIDACIÓN PARCIAL` y detallar cuál.

## 9. Checkpoints

Registrar en [`docs/04-BITACORA.md`](./docs/04-BITACORA.md) al: completar una funcionalidad o gate; detectar un bloqueo; aprobar un cambio de arquitectura, alcance o gobernanza; entregar trabajo a otra sesión; cerrar una etapa con pendientes.

**Campos mínimos:** `CHK-###`, fecha con zona o formato inequívoco, agente, objetivo, estado, requisitos y pruebas asociados, commit real si existe, archivos cambiados (rutas relativas), comandos y resultado real, evidencias `EV-##`, bloqueos, decisiones pendientes, siguiente acción y autorización necesaria.

Un checkpoint no reemplaza un commit. No inventar identificadores, pruebas, capturas, fechas ni commits.

### 9.1. Handoff

1. Leer este archivo, la documentación vigente y el último checkpoint.
2. Comprobar archivos y estado Git. Si no hay acceso: `NO VERIFICADO` y bloquear operaciones que dependan de ello.
3. Si el repositorio difiere del checkpoint, documentar la discrepancia antes de escribir.
4. Continuar solo la tarea autorizada desde el último estado comprobado.

## 10. Actualización documental y portabilidad

| Archivo | Actualizar al cambiar |
|---|---|
| `AGENTS.md` | Política de agentes o gobernanza aprobada. |
| `docs/01-REQUISITOS-RUBRICA.md` | Requisitos, criterios académicos, riesgos de rúbrica o entrega. |
| `docs/02-DECISIONES-ARQUITECTURA.md` | Stack, contratos, modelo de datos, estructura o decisión aprobada. |
| `docs/03-PLAN-PRUEBAS.md` | Casos, criterios, evidencias o gates académicos. |
| `docs/04-BITACORA.md` | Checkpoints, incidencias, bloqueos y handoffs. |
| `README.md` | Instalación, ejecución y alcance público. |

**Portabilidad:** enlaces relativos al documento que los contiene; desde `AGENTS.md`, `./docs/...`; desde `docs/`, `../`. Sin rutas absolutas ni unidades locales, perfiles de usuario o nombres de directorio de una máquina. Antes de aprobar un cambio documental, comprobar que los enlaces resuelven.

## 11. Salida obligatoria de cada tarea

1. Objetivo, alcance autorizado y estado final (`APROBADA`, `VALIDACIÓN PARCIAL`, `BLOQUEADA`).
2. Archivos cambiados (rutas relativas) y requisitos/casos relacionados.
3. Decisiones y documentación técnica consultadas; Context7 si correspondía.
4. Verificaciones: comando o acción, resultado observado y controles pendientes.
5. Errores e intentos, sin ocultar fallos.
6. Git: rama, commit real, cambios pendientes, acciones que necesitan autorización.
7. Próximo paso concreto y, si corresponde, `CHK-###`.

No reportar como creado, probado, publicado o aprobado nada que no se haya verificado.

## 12. Estado de referencia

- Carpeta del proyecto: `EVA2_APLICACIONES_MOVILES_LUKAS COVARRUBIAS_SEBASTIAN  MORALES` (doble espacio antes de `MORALES`).
- Repositorio Git local, rama `main`, sin remoto. Último commit de código: `a2e5b8f` (ver `docs/04`, CHK-003 y CHK-004).
- Código base existente: `src/app/` (`_layout.tsx`, `index.tsx`), `src/components/`, `src/features/tasks/` (modelo, validación, formulario), `src/theme/tokens.ts`. Dependencias instaladas según `package.json` y `package-lock.json`.
- Ejecución verificada: Expo Go + Metro (`npx expo start --android`). Build nativo no viable en el equipo actual (ver `docs/02`, decisión 16).
- Pendiente para nuevas etapas (autenticación, SQLite, cámara, GPS): autorización expresa (sección 5) y consulta a Context7 (sección 3).
