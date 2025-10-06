# Bitácora - Jair Hernández

- Fecha: 2025-10-06
- Rol: Desarrollador Backend

## Actividades realizadas
- Pendiente de inicio. Entorno del repositorio listo para clonar.

## Estado del Proyecto
- ✅ **API Usuarios COMPLETADA** por Jahir (ISS-01) - PR #35 hacia qa
- ⏳ **API Libros PENDIENTE** - Imanol (ISS-02)
- ⏳ **API Préstamos PENDIENTE** - Tu asignación (ISS-03)
- ⏳ **API Categorías PENDIENTE** - Antonio (ISS-04)

## Asignaciones
- ISS-03: API Préstamos - CRUD Completo - **LISTO PARA INICIAR**
  - GET, POST, GET/:id, PATCH/:id/return, DELETE/:id
  - Base de datos ya configurada en `app/lib/db.ts`
  - Funciones CRUD ya implementadas: `loanDb.*`

## Próximos pasos
1. Clonar el repo y crear rama: `feature/jair/ISS-03-api-prestamos-crud`.
2. Implementar todos los endpoints de préstamos usando `loanDb` de `app/lib/db.ts`:
   - `app/api/loans/route.ts` (GET, POST)
   - `app/api/loans/[id]/route.ts` (GET, DELETE)
   - `app/api/loans/[id]/return/route.ts` (PATCH)
3. Ejecutar tests automatizados: `npm test`.
4. Probar con `curl` y documentar en el PR.
5. Abrir PR hacia `qa` y solicitar revisión a Jahir.

## Notas
- Seguir convención de commits: `feat(loans): crear préstamo #03`.
- Los PRs siempre van a `qa` primero, enlazando el issue.
- **IMPORTANTE**: Usar `await params` en Next.js 15+ para rutas dinámicas.
- La API de usuarios ya está funcionando como referencia.
- Validar que usuario y libro existan antes de crear préstamo.
