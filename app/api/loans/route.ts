import { NextRequest, NextResponse } from 'next/server';
import { dbLoans, LoanStatus } from '@/app/lib/db';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isISODate(s: string): boolean {
  const ok = /^\d{4}-\d{2}-\d{2}$/.test(s);
  if (!ok) return false;
  const t = new Date(s).getTime();
  return Number.isFinite(t);
}

/** GET /api/loans — listar (ISS-12) */
export async function GET() {
  try {
    return NextResponse.json(dbLoans.findAll(), { status: 200 });
  } catch (e) {
    console.error('Error al listar préstamos:', e);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

/** POST /api/loans — registrar (ISS-11) */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId, amount, dueDate, status } = body ?? {};

    if (!userId || !uuidRegex.test(String(userId))) {
      return NextResponse.json({ error: 'userId es obligatorio y UUID válido' }, { status: 400 });
    }
    if (!dbLoans.userExists(userId)) {
      return NextResponse.json({ error: 'El usuario no existe' }, { status: 404 });
    }

    const numAmount = Number(amount);
    if (!Number.isFinite(numAmount) || numAmount <= 0) {
      return NextResponse.json({ error: 'amount debe ser un número > 0' }, { status: 400 });
    }

    if (!dueDate || !isISODate(String(dueDate))) {
      return NextResponse.json({ error: 'dueDate debe ser YYYY-MM-DD' }, { status: 400 });
    }
    const today = new Date(new Date().toDateString()).getTime();
    const due = new Date(String(dueDate)).getTime();
    if (due <= today) {
      return NextResponse.json({ error: 'dueDate debe ser futura' }, { status: 400 });
    }

    if (status && !(['pending', 'paid', 'late'] as LoanStatus[]).includes(status)) {
      return NextResponse.json({ error: 'status inválido: pending|paid|late' }, { status: 400 });
    }

    const loan = dbLoans.create({ userId, amount: numAmount, dueDate: String(dueDate), status });
    return NextResponse.json(loan, { status: 201 });
  } catch (e) {
    console.error('Error al crear préstamo:', e);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
