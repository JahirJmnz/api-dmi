
import { NextResponse } from 'next/server';
import { categoryDb } from '../../lib/db';

// GET /api/categories - Listar todas las categorías
export async function GET() {
  try {
    const categories = categoryDb.getAllCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Crear una nueva categoría
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, descripcion, activa } = body;

    // 1. Validar datos de entrada
    if (typeof nombre !== 'string' || nombre.trim() === '' || typeof descripcion !== 'string' || typeof activa !== 'boolean') {
      return NextResponse.json(
        { message: 'Datos de entrada inválidos. Se requiere nombre (string), descripcion (string) y activa (boolean).' },
        { status: 400 }
      );
    }

    // 2. Validar que el nombre no exista (case-insensitive)
    if (categoryDb.nameExists(nombre)) {
      return NextResponse.json(
        { message: `La categoría "${nombre}" ya existe.` },
        { status: 409 } // 409 Conflict
      );
    }

    // 3. Crear la categoría
    const newCategory = categoryDb.createCategory({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      activa,
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    // Manejo de errores de parsing de JSON o errores inesperados
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: 'Cuerpo de la solicitud JSON mal formado.' }, { status: 400 });
    }
    
    console.error('Error creating category:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
