
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  subject: string;
  genre: string;
  yearPublished: string;
  availability: 'Available' | 'Borrowed' | 'Reserved';
  copies: number;
  coverId: string;
}

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Modern Operating Systems',
    author: 'Andrew S. Tanenbaum',
    isbn: '978-0133591620',
    subject: 'Computer Science',
    genre: 'Academic',
    yearPublished: '2014',
    availability: 'Available',
    copies: 5,
    coverId: '101'
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    subject: 'Literature',
    genre: 'Fiction',
    yearPublished: '1925',
    availability: 'Borrowed',
    copies: 2,
    coverId: '102'
  },
  {
    id: '3',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0262033848',
    subject: 'Computer Science',
    genre: 'Academic',
    yearPublished: '2009',
    availability: 'Available',
    copies: 3,
    coverId: '103'
  },
  {
    id: '4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '978-0062316097',
    subject: 'History',
    genre: 'Non-Fiction',
    yearPublished: '2011',
    availability: 'Available',
    copies: 8,
    coverId: '104'
  },
  {
    id: '5',
    title: 'The Art of Computer Programming',
    author: 'Donald Knuth',
    isbn: '978-0201896831',
    subject: 'Computer Science',
    genre: 'Academic',
    yearPublished: '1968',
    availability: 'Reserved',
    copies: 1,
    coverId: '105'
  },
  {
    id: '6',
    title: 'Brief Answers to the Big Questions',
    author: 'Stephen Hawking',
    isbn: '978-1473695986',
    subject: 'Science',
    genre: 'Non-Fiction',
    yearPublished: '2018',
    availability: 'Available',
    copies: 4,
    coverId: '106'
  }
];

export interface Loan {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Active' | 'Returned' | 'Overdue';
}

export const LOANS: Loan[] = [
  {
    id: 'l1',
    bookId: '2',
    userId: 'u1',
    borrowDate: '2023-10-01',
    dueDate: '2023-10-15',
    status: 'Overdue'
  },
  {
    id: 'l2',
    bookId: '1',
    userId: 'u1',
    borrowDate: '2024-02-01',
    dueDate: '2024-02-15',
    status: 'Active'
  }
];
