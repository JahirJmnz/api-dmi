import { NextResponse } from 'next/server';

// GET /api/ping - Health check endpoint
export async function GET() {
  try {
    const response = {
      ok: true,
      timestamp: Date.now(),
      message: 'API funcionando correctamente'
    };
    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error en ping:', error);
    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
