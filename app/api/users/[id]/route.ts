import { NextRequest, NextResponse } from 'next/server';
import { userDb } from '@/app/lib/db';

// GET /api/users/[id] - Obtener usuario por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validar formato UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'ID de usuario inválido' },
        { status: 400 }
      );
    }
    
    const user = userDb.getUserById(id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Actualizar usuario
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Validar formato UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'ID de usuario inválido' },
        { status: 400 }
      );
    }
    
    // Verificar que el usuario existe
    const existingUser = userDb.getUserById(id);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    // Validar campos si se proporcionan
    if (body.nombre !== undefined) {
      if (!body.nombre || body.nombre.length < 2) {
        return NextResponse.json(
          { error: 'El nombre debe tener al menos 2 caracteres' },
          { status: 400 }
        );
      }
    }
    
    if (body.email !== undefined) {
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: 'El formato del email no es válido' },
          { status: 400 }
        );
      }
      
      // Validar que el email no exista en otro usuario
      if (userDb.emailExists(body.email, id)) {
        return NextResponse.json(
          { error: 'El email ya está registrado por otro usuario' },
          { status: 409 }
        );
      }
    }
    
    // Preparar datos para actualización
    const updateData: any = {};
    if (body.nombre !== undefined) {
      updateData.nombre = body.nombre.trim();
    }
    if (body.email !== undefined) {
      updateData.email = body.email.toLowerCase().trim();
    }
    
    // Actualizar usuario
    const updatedUser = userDb.updateUser(id, updateData);
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Error al actualizar el usuario' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    
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

// DELETE /api/users/[id] - Eliminar usuario
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validar formato UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'ID de usuario inválido' },
        { status: 400 }
      );
    }
    
    // Verificar que el usuario existe
    const existingUser = userDb.getUserById(id);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    // Eliminar usuario
    const deleted = userDb.deleteUser(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Error al eliminar el usuario' },
        { status: 500 }
      );
    }
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
