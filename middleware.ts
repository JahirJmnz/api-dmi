import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const start = Date.now();
  const { method, url } = request;
  
  // Log de entrada
  console.log(`[${new Date().toISOString()}] ${method} ${url} - Iniciando request`);
  
  const response = NextResponse.next();
  
  // Log de salida con tiempo de respuesta
  const duration = Date.now() - start;
  console.log(`[${new Date().toISOString()}] ${method} ${url} - Completado en ${duration}ms`);
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
};
