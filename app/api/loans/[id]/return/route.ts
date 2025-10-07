import { NextResponse } from 'next/server';

type Loan = {
  id: string;
  userId: string;
  bookId: string;
  amount: number;
  dueDate: string;
  returned: boolean;
  createdAt: string;
  returnedAt?: string | null;
};

const store: { loans: Loan[] } = (globalThis as any);
if (!store.loans) {
  store.loans = [];
}

// PATCH /api/loans/:id/return — marcar como devuelto
export async function PATCH(_: Request, { params }: { params: { id: string }}) {
  const loan = store.loans.find(l => l.id === params.id);
  if (!loan) {
    return NextResponse.json({ error: 'Préstamo no encontrado' }, { status: 404 });
  }
  if (loan.returned) {
    return NextResponse.json({ error: 'El préstamo ya fue devuelto' }, { status: 409 });
  }

  loan.returned = true;
  loan.returnedAt = new Date().toISOString();
  return NextResponse.json({ ok: true, data: loan }, { status: 200 });
}
