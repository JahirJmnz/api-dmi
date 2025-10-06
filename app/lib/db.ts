import { randomUUID } from 'crypto';

// Interfaces para la API de biblioteca
export interface User {
  id: string;
  nombre: string;
  email: string;
}

export interface Book {
  id: string;
  titulo: string;
  autor: string;
  isbn: string;
  disponible: boolean;
}

export interface Loan {
  id: string;
  usuarioId: string;
  libroId: string;
  fechaPrestamo: string;
  fechaDevolucion: string | null;
}

export interface Category {
  id: string;
  nombre: string;
  descripcion: string;
  activa: boolean;
}

// Almacenamiento en memoria
let users: User[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    nombre: 'Juan Pérez',
    email: 'juan@email.com'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    nombre: 'María García',
    email: 'maria@email.com'
  }
];

let books: Book[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    titulo: 'El Quijote',
    autor: 'Miguel de Cervantes',
    isbn: '978-84-376-0494-7',
    disponible: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    isbn: '978-84-376-0495-4',
    disponible: true
  }
];

let loans: Loan[] = [];

let categories: Category[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    nombre: 'Ficción',
    descripcion: 'Libros de ficción y novelas',
    activa: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    nombre: 'No Ficción',
    descripcion: 'Libros de no ficción y académicos',
    activa: true
  }
];

// Funciones CRUD para usuarios
export const userDb = {
  getAllUsers: (): User[] => users,
  
  getUserById: (id: string): User | undefined => {
    return users.find(user => user.id === id);
  },

  createUser: (userData: Omit<User, 'id'>): User => {
    const newUser: User = {
      id: randomUUID(),
      ...userData
    };
    users.push(newUser);
    return newUser;
  },

  updateUser: (id: string, userData: Partial<Omit<User, 'id'>>): User | null => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    users[userIndex] = { ...users[userIndex], ...userData };
    return users[userIndex];
  },

  deleteUser: (id: string): boolean => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    
    users.splice(userIndex, 1);
    return true;
  },

  emailExists: (email: string, excludeId?: string): boolean => {
    return users.some(user => 
      user.email === email && user.id !== excludeId
    );
  }
};

// Funciones CRUD para libros
export const bookDb = {
  getAllBooks: (): Book[] => books,
  
  getBookById: (id: string): Book | undefined => {
    return books.find(book => book.id === id);
  },

  createBook: (bookData: Omit<Book, 'id'>): Book => {
    const newBook: Book = {
      id: randomUUID(),
      ...bookData
    };
    books.push(newBook);
    return newBook;
  },

  updateBook: (id: string, bookData: Partial<Omit<Book, 'id'>>): Book | null => {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) return null;
    
    books[bookIndex] = { ...books[bookIndex], ...bookData };
    return books[bookIndex];
  },

  deleteBook: (id: string): boolean => {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) return false;
    
    books.splice(bookIndex, 1);
    return true;
  },

  isbnExists: (isbn: string, excludeId?: string): boolean => {
    return books.some(book => 
      book.isbn === isbn && book.id !== excludeId
    );
  }
};

// Funciones CRUD para préstamos
export const loanDb = {
  getAllLoans: (): Loan[] => loans,
  
  getLoanById: (id: string): Loan | undefined => {
    return loans.find(loan => loan.id === id);
  },

  createLoan: (loanData: Omit<Loan, 'id' | 'fechaPrestamo' | 'fechaDevolucion'>): Loan => {
    const newLoan: Loan = {
      id: randomUUID(),
      ...loanData,
      fechaPrestamo: new Date().toISOString(),
      fechaDevolucion: null
    };
    loans.push(newLoan);
    return newLoan;
  },

  returnLoan: (id: string): Loan | null => {
    const loanIndex = loans.findIndex(loan => loan.id === id);
    if (loanIndex === -1) return null;
    
    loans[loanIndex].fechaDevolucion = new Date().toISOString();
    return loans[loanIndex];
  },

  getActiveLoans: (): Loan[] => {
    return loans.filter(loan => loan.fechaDevolucion === null);
  }
};

// Funciones CRUD para categorías
export const categoryDb = {
  getAllCategories: (): Category[] => categories,
  
  getCategoryById: (id: string): Category | undefined => {
    return categories.find(category => category.id === id);
  },

  createCategory: (categoryData: Omit<Category, 'id'>): Category => {
    const newCategory: Category = {
      id: randomUUID(),
      ...categoryData
    };
    categories.push(newCategory);
    return newCategory;
  },

  updateCategory: (id: string, categoryData: Partial<Omit<Category, 'id'>>): Category | null => {
    const categoryIndex = categories.findIndex(category => category.id === id);
    if (categoryIndex === -1) return null;
    
    categories[categoryIndex] = { ...categories[categoryIndex], ...categoryData };
    return categories[categoryIndex];
  },

  deleteCategory: (id: string): boolean => {
    const categoryIndex = categories.findIndex(category => category.id === id);
    if (categoryIndex === -1) return false;
    
    categories.splice(categoryIndex, 1);
    return true;
  },

  nameExists: (nombre: string, excludeId?: string): boolean => {
    return categories.some(category => 
      category.nombre.toLowerCase() === nombre.toLowerCase() && category.id !== excludeId
    );
  }
};
