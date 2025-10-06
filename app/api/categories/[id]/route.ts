import { NextResponse } from 'next/server';
import { categoryDb } from '@/app/lib/db';

// Expresión regular para validar un UUID
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Definimos la forma del objeto de contexto que Next.js pasa a la ruta
interface RouteContext {
  params: { id: string };
}

// GET /api/categories/:id - Obtener una categoría por ID
export async function GET(request: Request, context: RouteContext) {
  try {
    const id = context.params.id;

    if (!UUID_REGEX.test(id)) {
      return NextResponse.json({ message: 'El ID proporcionado no es un UUID válido.' }, { status: 400 });
    }

    const category = categoryDb.getCategoryById(id);

    if (!category) {
      return NextResponse.json({ message: `Categoría con ID "${id}" no encontrada.` }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error(`Error fetching category:`, errorMessage);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

// PUT /api/categories/:id - Actualizar una categoría
export async function PUT(request: Request, context: RouteContext) {
  try {
    const id = context.params.id;
    const body = await request.json();
    const { nombre, descripcion, activa } = body;

    if (!UUID_REGEX.test(id)) {
      return NextResponse.json({ message: 'El ID proporcionado no es un UUID válido.' }, { status: 400 });
    }

    if (nombre === undefined && descripcion === undefined && activa === undefined) {
      return NextResponse.json({ message: 'Se requiere al menos un campo (nombre, descripcion, activa) para actualizar.' }, { status: 400 });
    }

    if (typeof nombre === 'string' && categoryDb.nameExists(nombre, id)) {
      return NextResponse.json({ message: `La categoría "${nombre}" ya existe.` }, { status: 409 });
    }

    const updatedCategory = categoryDb.updateCategory(id, {
      ...(nombre !== undefined && { nombre: String(nombre).trim() }),
      ...(descripcion !== undefined && { descripcion: String(descripcion).trim() }),
      ...(activa !== undefined && { activa: Boolean(activa) }),
    });

    if (!updatedCategory) {
      return NextResponse.json({ message: `Categoría con ID "${id}" no encontrada.` }, { status: 404 });
    }

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: 'Cuerpo de la solicitud JSON mal formado.' }, { status: 400 });
    }
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error(`Error updating category:`, errorMessage);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

// DELETE /api/categories/:id - Eliminar una categoría
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const id = context.params.id;

    if (!UUID_REGEX.test(id)) {
      return NextResponse.json({ message: 'El ID proporcionado no es un UUID válido.' }, { status: 400 });
    }

    const success = categoryDb.deleteCategory(id);

    if (!success) {
      return NextResponse.json({ message: `Categoría con ID "${id}" no encontrada.` }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error(`Error deleting category:`, errorMessage);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}