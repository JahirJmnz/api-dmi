import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

// GET /api/users - Listar todos los usuarios
export async function GET() {
  try {
    const users = db.getAllUsers();
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
    const { name, email, age } = body;

    // Validaciones básicas
    if (!name || !email || !age) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: name, email, age' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Validar edad
    if (typeof age !== 'number' || age < 1 || age > 120) {
      return NextResponse.json(
        { error: 'La edad debe ser un número entre 1 y 120' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    if (db.emailExists(email)) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 409 }
      );
    }

    // Crear usuario
    const newUser = db.createUser({ name, email, age });
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
