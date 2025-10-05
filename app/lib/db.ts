import { randomUUID } from 'crypto';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Almacenamiento en memoria
let users: User[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Juan Pérez',
    email: 'juan@email.com',
    age: 25
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'María García',
    email: 'maria@email.com',
    age: 30
  }
];

// Funciones CRUD
export const db = {
  // Obtener todos los usuarios
  getAllUsers: (): User[] => {
    return users;
  },

  // Obtener usuario por ID
  getUserById: (id: string): User | undefined => {
    return users.find(user => user.id === id);
  },

  // Crear nuevo usuario
  createUser: (userData: Omit<User, 'id'>): User => {
    const newUser: User = {
      id: randomUUID(),
      ...userData
    };
    users.push(newUser);
    return newUser;
  },

  // Actualizar usuario
  updateUser: (id: string, userData: Partial<Omit<User, 'id'>>): User | null => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    
    users[userIndex] = { ...users[userIndex], ...userData };
    return users[userIndex];
  },

  // Eliminar usuario
  deleteUser: (id: string): boolean => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    
    users.splice(userIndex, 1);
    return true;
  },

  // Verificar si email existe
  emailExists: (email: string, excludeId?: string): boolean => {
    return users.some(user => 
      user.email === email && user.id !== excludeId
    );
  },

  // Obtener usuario por email
  getUserByEmail: (email: string): User | undefined => {
    return users.find(user => user.email === email);
  }
};



export type LoanStatus = 'pending' | 'paid' | 'overdue';

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  dueDate: string; // YYYY-MM-DD
  status: LoanStatus;
}

const _loans: Loan[] = [];

export const dbLoans = {
  create: (data: Omit<Loan, 'id' | 'status'> & { status?: LoanStatus }): Loan => {
    const loan: Loan = { id: randomUUID(), status: data.status ?? 'pending', ...data };
    _loans.push(loan);
    return loan;
  },
  findAll: (): Loan[] => [..._loans].sort(
    (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
  ),
  userExists: (userId: string): boolean => {
    // @ts-ignore: 'users' vive en este mismo módulo (sección de /api/users)
    return Array.isArray(users) ? users.some(u => u.id === userId) : false;
  }
};

