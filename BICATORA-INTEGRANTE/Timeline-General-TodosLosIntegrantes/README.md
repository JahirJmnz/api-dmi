# Timeline General - Equipo SHD

Propósito: guiar el progreso del equipo con fechas, estado y próximos pasos.

## Estado actual (2025-10-04)
- Repositorio inicializado y ramas creadas: `main`, `qa`, `release`.
- Proyecto Next.js + TypeScript + ESLint configurado.
- API de biblioteca completa con 4 entidades: usuarios, libros, préstamos, categorías.
- Base de datos en memoria con CRUD completo para todas las entidades.
- 4 issues creados con APIs CRUD completas asignadas equitativamente.
- Tests automatizados implementados (`test-api.js`).
- Archivos de contexto y guía presentes en `CONTEXTO-GENERAL-DEL-PROYECTO/`.

## Vista Kanban (resumen)
- TODO:
  - Implementar 4 APIs CRUD completas por integrante.
  - Ejecutar tests automatizados antes de cada PR.
  - Revisar PRs y hacer merge a `qa`.
- DOING:
  - Ninguno (a la espera de que integrantes clonen y empiecen).
- DONE:
  - Setup Next.js + estructura API de biblioteca.
  - `app/lib/db.ts` con CRUD completo para 4 entidades.
  - 4 issues creados con asignaciones equitativas.
  - Tests automatizados implementados.
  - Documentación completa con ejemplos curl.
  - Protección de ramas configurada.

## Hitos con fechas
- 2025-10-04: Setup del repo y del proyecto base (completado).
- 2025-10-04 (tarde): Crear 4 issues con APIs CRUD completas y asignaciones equitativas (completado).
- 2025-10-04 (tarde): Implementar tests automatizados y documentación completa (completado).
- 2025-10-05: Integrantes clonan repo y empiezan desarrollo de sus APIs asignadas (pendiente).
- 2025-10-06: Implementar API Usuarios (Jahir) y API Libros (Imanol) (pendiente).
- 2025-10-07: Implementar API Préstamos (Jair) y API Categorías (Antonio) (pendiente).
- 2025-10-08: Revisiones de PRs y merges a `qa` (pendiente).
- 2025-10-09: Selección de features para `release` y PR hacia `main` (pendiente).

## Próximos pasos (ordenados)
1. ✅ Repositorio público en GitHub con colaboradores invitados.
2. ✅ Protección de ramas `main` y `release` configurada.
3. ✅ 4 issues creados con APIs CRUD completas y asignaciones equitativas.
4. **PENDIENTE**: Cada integrante clona repo y crea rama `feature/<nombre>/ISS-XX-api-xxx-crud`.
5. **PENDIENTE**: Implementar APIs asignadas y ejecutar `npm test` antes de PR.
6. **PENDIENTE**: Abrir PR hacia `qa` con evidencia de tests pasando.
7. **PENDIENTE**: Jahir revisa PRs, solicita cambios si aplica y hace merge a `qa`.
8. **PENDIENTE**: Con `qa` estable, seleccionar 1–2 features para `release` y abrir PR.
9. **PENDIENTE**: Hacer PR final de `release` a `main` cuando todo esté verificado.
10. **PENDIENTE**: Preparar demo y evidencias (capturas de PRs, `git shortlog -sne`).

## Asignaciones actuales
- **ISS-01**: API Usuarios (CRUD Completo) → **@JahirJmnz**
- **ISS-02**: API Libros (CRUD Completo) → **@Imamtz0104**
- **ISS-03**: API Préstamos (CRUD Completo) → **@Jairhc2**
- **ISS-04**: API Categorías (CRUD Completo) → **@Antonioh1ni**

## Reglas operativas
- Commits: `feat(users): implementar CRUD usuarios #01`.
- PRs: hacia `qa` primero; enlazar el issue correspondiente.
- Tests: ejecutar `npm test` antes de cada PR.
- Documentación: README ya actualizado con ejemplos `curl` completos.
- Mantener `CONTEXTO-GENERAL-DEL-PROYECTO/` siempre visible y actualizado.
