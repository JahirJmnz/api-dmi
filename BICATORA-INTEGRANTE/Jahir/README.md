# Bitácora - Jahir Jiménez

- Fecha: 2025-10-04
- Rol: Líder del equipo SHD

## Actividades realizadas
- Inicialicé el repositorio Git y configuré ramas: `main`, `qa`, `release`.
- Generé el proyecto base con Next.js + TypeScript + ESLint.
- Creé el módulo `app/lib/db.ts` con almacenamiento en memoria para API de biblioteca.
- Implementé endpoint base:
  - `GET /api/ping` (health check básico)
- Reestructuré el proyecto para API de biblioteca (usuarios, libros, préstamos).
- Creé 10 issues correctamente asignados a cada integrante con tests.
- Actualicé documentación para reflejar API de biblioteca.
- Configuré protección de ramas y plantillas de PR.

## Entregables creados
- `app/lib/db.ts` (módulo de base de datos para biblioteca)
- `app/api/ping/route.ts` (health check básico)
- `middleware.ts` (logging de requests)
- `.github/pull_request_template.md` (plantilla de PR)
- `README.md` (documentación completa de API de biblioteca)
- Configuración base (`package.json`, `tsconfig.json`, `eslint.config.mjs`, `next.config.ts`).

## Pendientes personales (siguientes)
- Revisar PRs de compañeros y hacer merge a `qa`.
- Seleccionar 1-2 features para promover a `release`.
- Trabajar en:
  - ISS-05: POST /api/loans (registrar préstamo)
  - ISS-06: GET /api/loans (listar préstamos)
  - ISS-07: PATCH /api/loans/:id/return (devolver libro)
  - ISS-10: Documentación completa y pruebas
  - Coordinación general del equipo.

## Tareas y estado
- [x] [COMPLETADO] Publicar ramas remotas: `qa` y `release` (push inicial) - **Evidencia**: `git push origin qa release` exitoso
- [x] [COMPLETADO] Proteger ramas `main` y `release` en GitHub (PR obligatorio + 1 review) - **Evidencia**: Protección configurada manualmente en GitHub
- [x] [COMPLETADO] Reestructurar proyecto para API de biblioteca - **Evidencia**: Eliminada API de usuarios, creada estructura para biblioteca
- [x] [COMPLETADO] Crear 10 issues correctamente asignados con tests - **Evidencia**: Issues #21-30 creados y asignados a cada integrante
- [x] [COMPLETADO] Alinear asignaciones entre guía y bitácoras individuales - **Evidencia**: Bitácoras actualizadas con nuevas asignaciones
- [x] [COMPLETADO] Actualizar `README.md` del proyecto con endpoints y ejemplos `curl` - **Evidencia**: README completo con todos los endpoints y comandos curl
- [x] [COMPLETADO] Añadir `.github/pull_request_template.md` con checklist de pruebas/review - **Evidencia**: Archivo creado en `.github/pull_request_template.md`
- [x] [COMPLETADO] Implementar logging básico por request (`middleware.ts` con método, URL y tiempo) - **Evidencia**: `middleware.ts` creado y funcionando
- [x] [COMPLETADO] Agregar endpoint `GET /api/ping` (health sencillo) - **Evidencia**: `curl http://localhost:3000/api/ping` responde correctamente
- [x] [COMPLETADO] Validar `id` como UUID en endpoints o normalizar datos semilla a UUID - **Evidencia**: IDs normalizados a UUID y validación implementada
- [x] [COMPLETADO] ISS-09: Validaciones y errores comunes (400/404/409) - **Evidencia**: Validaciones implementadas en todos los endpoints
- [x] [COMPLETADO] ISS-10: Documentación de pruebas (README + `curl`) - **Evidencia**: README actualizado con ejemplos curl
- [x] [COMPLETADO] ISS-12: Logging simple por request - **Evidencia**: Middleware implementado y funcionando

## Issues creados en GitHub (10 total)

### ⏳ PENDIENTES (10 issues) - Asignados correctamente
- **ISS-01**: GET /api/users - Listar usuarios (@Jairhc2)
- **ISS-02**: POST /api/users - Crear usuario (@Jairhc2)
- **ISS-03**: GET /api/books - Listar libros (@Imamtz0104)
- **ISS-04**: POST /api/books - Crear libro (@Imamtz0104)
- **ISS-05**: POST /api/loans - Registrar préstamo (@JahirJmnz)
- **ISS-06**: GET /api/loans - Listar préstamos (@JahirJmnz)
- **ISS-07**: PATCH /api/loans/:id/return - Devolver libro (@JahirJmnz)
- **ISS-08**: GET /api/health - Health check avanzado (@Jairhc2)
- **ISS-09**: Validaciones mejoradas y manejo de errores (@Imamtz0104)
- **ISS-10**: Documentación completa y pruebas (@JahirJmnz)

### 📊 Distribución por integrante
- **Jair**: 3 issues (ISS-01, ISS-02, ISS-08)
- **Imanol**: 3 issues (ISS-03, ISS-04, ISS-09)
- **Jahir**: 4 issues (ISS-05, ISS-06, ISS-07, ISS-10)

## Notas
- Los PRs deben ir primero a `qa`. Promover a `release` solo lo validado.
- Mantener visibles `CONTEXTO-GENERAL-DEL-PROYECTO/Guia-de-trabajo-y-contexto.md` y `Contexto.md`.
