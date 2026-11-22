# 01 — Requisitos, alcance y trazabilidad de la rúbrica

> **Proyecto:** To-Do móvil ampliada — Desarrollo de Aplicaciones Móviles, Unidad 2
> **Estado:** reglas aprobadas por el usuario el 2026-11-21; RF-01 a RF-13 implementados. Entrega académica en curso: README como documento de entrega (decisión del usuario, 2026-11-22); G1 y G4 `PARCIAL` (`docs/03`, sección 3).
> **Fuentes académicas:** `Evaluación_U2.pdf` (enunciado) y `Rúbrica_U2.pdf` (rúbrica), no versionados en este repositorio.
> **Objetivo académico:** nivel **Sobresaliente (90 %–100 %)** para los indicadores cubribles; ver riesgo aceptado en la sección 4.

## 1. Requisitos del enunciado

Desde el enunciado (`Evaluación_U2.pdf`):

- Ampliar la To-Do básica con periféricos del dispositivo: captura de imagen con cámara adjunta a tareas, y GPS para registrar dónde se crea cada tarea.
- Sincronizar tareas con servicio web o API externa; importar tareas desde API externa; sincronización en tiempo real y datos adicionales por tarea. **Excluido; exención confirmada por escrito por el profesor (README sección 16.3).**
- Almacenamiento local que funcione sin conexión.
- Autenticación de usuarios que proteja las tareas y permita múltiples usuarios.
- Pruebas automatizadas de captura de imagen y obtención de ubicación.
- Tecnologías: el enunciado pide Ionic CLI y plugins de Capacitor. **El equipo aprobó React Native + Expo** (ver `docs/02`, decisión 1 y riesgo aceptado).

## 2. Requisitos funcionales (`RF-##`)

| ID    | Requisito                       | Criterio observable                                                                          |
| ----- | ------------------------------- | -------------------------------------------------------------------------------------------- |
| RF-01 | Registro de usuario             | Crear cuenta con nombre, correo y clave (mínimo 8 caracteres).                               |
| RF-02 | Inicio de sesión                | Login con correo y clave; error genérico ante credenciales inválidas.                        |
| RF-03 | Cierre de sesión                | Vuelve a la pantalla de acceso; no muestra tareas ajenas.                                    |
| RF-04 | Listar tareas del usuario       | Solo aparecen tareas con `usuario_id` de la sesión activa.                                   |
| RF-05 | Crear tarea                     | Título y descripción obligatorios; se guarda en SQLite.                                      |
| RF-06 | Editar tarea                    | Cambios persisten tras reinicio de la app.                                                   |
| RF-07 | Eliminar tarea con confirmación | Diálogo de confirmación antes de borrar.                                                     |
| RF-08 | Completar / reabrir tarea       | Cambia `completada`; persiste.                                                               |
| RF-09 | Filtrar tareas                  | Filtros: Todas, Pendientes, Completadas.                                                     |
| RF-10 | Validación de campos            | Límites de caracteres, recorte de espacios exteriores, contadores y mensajes no bloqueantes. |
| RF-11 | Foto adjunta a tarea            | Tomar foto con cámara; se guarda `foto_uri`; se muestra en el detalle.                       |
| RF-12 | Ubicación GPS al crear tarea    | Lectura única; se guardan `latitud` y `longitud`; se muestran en el detalle.                 |
| RF-13 | Persistencia sin conexión       | Tareas, usuarios y sesión sobreviven cierre y reapertura de la app en modo avión.            |

## 3. Rúbrica (`RUB-##`) y puntajes verificados

Puntajes leídos de `Rúbrica_U2.pdf` (niveles Bajo / Medio / Alto / Sobresaliente):

| ID     | Indicador                                                | Máx.    | Niveles (0 / 5 / 10 / 20 o 0 / 3 / 6 / 12 o 0 / 7 / 14 / 28) | Estado                               |
| ------ | -------------------------------------------------------- | ------- | ------------------------------------------------------------ | ------------------------------------ |
| RUB-01 | Desarrolla funcionalidades con periféricos (cámara, GPS) | 20      | 0 / 5 / 10 / 20                                              | Cubrible con RF-11, RF-12            |
| RUB-02 | Integra permisos de usuario de forma segura              | 20      | 0 / 5 / 10 / 20                                              | Cubrible con RF-11, RF-12            |
| RUB-03 | Prueba funcionalidad de periféricos                      | 12      | 0 / 3 / 6 / 12                                               | Cubrible con pruebas Jest y manuales |
| RUB-04 | Integra con servicios web y APIs                         | 28      | 0 / 7 / 14 / 28                                              | **No cubierto** (riesgo aceptado)    |
| RUB-05 | Prueba integración con servicios web y APIs              | 20      | 0 / 5 / 10 / 20                                              | **No cubierto** (riesgo aceptado)    |
|        | **Total**                                                | **100** |                                                              | Tope sin RUB-04 y RUB-05: **52**     |

## 4. Riesgo aceptado

1. **APIs externas excluidas.** Confirmado por escrito por el profesor (README sección 16.3): solo se evalúa la conexión con APIs internas del dispositivo, no servicios web. Sin RUB-04 y RUB-05 el máximo es 52/100 si la rúbrica no se recalcula (NO VERIFICADO); por lo tanto **no se declara Sobresaliente**.
2. **Stack distinto al enunciado.** El enunciado pide Ionic + Capacitor; el equipo usa React Native + Expo. La rúbrica no puntúa el stack, pero el enunciado sí lo pide. Riesgo de penalización. Debe presentarse explícitamente en la entrega junto con la comparación de `docs/02`.
3. **Sustitución de la lista de tareas:** las funciones de la To-Do base de la Unidad 1 se rehacen sobre el nuevo modelo con usuario y SQLite.

## 5. Mapa de trazabilidad

| Requisito                       | Indicadores                              | Casos de prueba (`docs/03`)                |
| ------------------------------- | ---------------------------------------- | ------------------------------------------ |
| RF-11 foto adjunta              | RUB-01, RUB-02                           | CP-PER-01, CP-PER-02, CP-MOV-02, CP-MOV-03 |
| RF-12 ubicación GPS             | RUB-01, RUB-02                           | CP-GPS-01, CP-GPS-02, CP-MOV-04, CP-MOV-05 |
| Permisos denegados              | RUB-02, RUB-03                           | CP-PER-02, CP-GPS-02, CP-MOV-03, CP-MOV-05 |
| RF-13 persistencia sin conexión | RUB-03 (regresión)                       | CP-MOV-06                                  |
| RF-01 a RF-03 autenticación     | Requisito del enunciado (no mapea a RUB) | CP-AUTH-01 a CP-AUTH-03, CP-MOV-01         |
| RF-04 a RF-10 tareas            | Requisito del enunciado (no mapea a RUB) | CP-TAR-01, CP-TAR-02                       |

## 6. Checklist de entrega (formato del enunciado)

- [ ] Portada: título, asignatura e integrantes (Lukas Covarrubias y Sebastian Morales) presentes en el README. Profesor: Boris Marcelo Belmar Muñoz (chat del docente). Logo institucional: `./docs/assets/logo-instituto-profesional-san-sebastian.png` (commit `0f91064`).
- [x] Desarrollo de los ítems temáticos o instrucciones de la tarea: README secciones 1 a 15.
- [ ] Archivo Word o PDF: NO CUMPLIDO por decisión del usuario (2026-11-22): entrega solo en Markdown (`README.md`), sin Word ni PDF. Riesgo registrado en README sección 16.1.
- [ ] Nombre del archivo: `EVA2_APLICACIONES_MOVILES_LUKAS_COVARRUBIAS_SEBASTIAN_MORALES` (decisión del usuario; difiere de `EVU2_APELLIDO_NOMBRE` del enunciado, ver `docs/04` CHK-002). NO CUMPLIDO sin archivo Word o PDF.
- [ ] Arial 12; interlineado 1,15; alineación justificada; páginas numeradas: NO CUMPLIDO en Markdown.
- [x] Evidencias de `docs/evidencias/` referenciadas en README sección 10 (EV-01 a EV-32).
- [x] Exención de APIs: confirmada por escrito por el profesor (README sección 16.3).
- [x] Riesgo de stack explicado: README sección 6.1 y `docs/02`, sección 4.
