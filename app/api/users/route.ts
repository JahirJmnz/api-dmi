import { NextRequest, NextResponse } from 'next/server';
import { userDb, User } from '@/app/lib/db';

// GET /api/users - Listar todos los usuarios
export async function GET() {
  try {
    const users = userDb.getAllUsers();
    
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST /api/users - Crear nuevo usuario
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar campos requeridos
    if (!body.nombre || !body.email) {
      return NextResponse.json(
        { error: 'Los campos nombre y email son requeridos' },
        { status: 400 }
      );
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      );
    }
    
    // Validar longitud del nombre
    if (body.nombre.length < 2) {
      return NextResponse.json(
        { error: 'El nombre debe tener al menos 2 caracteres' },
        { status: 400 }
      );
    }
    
    // Validar que el email no exista
    if (userDb.emailExists(body.email)) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 409 }
      );
    }
    
    // Crear usuario
    const newUser = userDb.createUser({
      nombre: body.nombre.trim(),
      email: body.email.toLowerCase().trim()
    });
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    
    // Si es error de JSON parsing
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Formato JSON inválido' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
