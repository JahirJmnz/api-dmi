# Bitácora - Imanol Hernández

- Fecha: 2025-10-06
- Rol: Desarrollador Backend

## Actividades realizadas
- Pendiente de inicio. Entorno del repositorio listo para clonar.

## Estado del Proyecto
- ✅ **API Usuarios COMPLETADA** por Jahir (ISS-01) - PR #35 hacia qa
- ⏳ **API Libros PENDIENTE** - Tu asignación (ISS-02)
- ⏳ **API Préstamos PENDIENTE** - Jair (ISS-03)
- ⏳ **API Categorías PENDIENTE** - Antonio (ISS-04)

## Asignaciones
- ISS-02: API Libros - CRUD Completo - **LISTO PARA INICIAR**
  - GET, POST, GET/:id, PUT/:id, DELETE/:id
  - Base de datos ya configurada en `app/lib/db.ts`
  - Funciones CRUD ya implementadas: `bookDb.*`

## Próximos pasos
1. Clonar el repo y crear rama: `feature/imanol/ISS-02-api-libros-crud`.
2. Implementar todos los endpoints de libros usando `bookDb` de `app/lib/db.ts`:
   - `app/api/books/route.ts` (GET, POST)
   - `app/api/books/[id]/route.ts` (GET, PUT, DELETE)
3. Ejecutar tests automatizados: `npm test`.
4. Documentar y probar con `curl` en el PR.
5. Abrir PR hacia `qa` y solicitar revisión a Jahir.

## Notas
- Seguir convención de commits: `feat(books): crear libro #02`.
- Los PRs siempre van a `qa` primero, enlazando el issue.
- **IMPORTANTE**: Usar `await params` en Next.js 15+ para rutas dinámicas.
- La API de usuarios ya está funcionando como referencia.
