
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
  },
  {
    id: '7',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    subject: 'Computer Science',
    genre: 'Academic',
    yearPublished: '2008',
    availability: 'Available',
    copies: 6,
    coverId: '107'
  },
  {
    id: '8',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    isbn: '978-0135957059',
    subject: 'Computer Science',
    genre: 'Academic',
    yearPublished: '1999',
    availability: 'Available',
    copies: 4,
    coverId: '108'
  },
  {
    id: '9',
    title: 'Design Patterns',
    author: 'Erich Gamma',
    isbn: '978-0201633610',
    subject: 'Computer Science',
    genre: 'Academic',
    yearPublished: '1994',
    availability: 'Available',
    copies: 3,
    coverId: '109'
  },
  {
    id: '10',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0446310789',
    subject: 'Literature',
    genre: 'Fiction',
    yearPublished: '1960',
    availability: 'Available',
    copies: 10,
    coverId: '110'
  },
  {
    id: '11',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    subject: 'Literature',
    genre: 'Fiction',
    yearPublished: '1949',
    availability: 'Available',
    copies: 12,
    coverId: '111'
  },
  {
    id: '12',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    isbn: '978-0553380163',
    subject: 'Science',
    genre: 'Non-Fiction',
    yearPublished: '1988',
    availability: 'Available',
    copies: 7,
    coverId: '112'
  },
  {
    id: '13',
    title: 'Cosmos',
    author: 'Carl Sagan',
    isbn: '978-0345331359',
    subject: 'Science',
    genre: 'Non-Fiction',
    yearPublished: '1980',
    availability: 'Available',
    copies: 5,
    coverId: '113'
  },
  {
    id: '14',
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    isbn: '978-0393317558',
    subject: 'History',
    genre: 'Non-Fiction',
    yearPublished: '1997',
    availability: 'Available',
    copies: 4,
    coverId: '114'
  },
  {
    id: '15',
    title: 'The Silk Roads',
    author: 'Peter Frankopan',
    isbn: '978-1101912379',
    subject: 'History',
    genre: 'Non-Fiction',
    yearPublished: '2015',
    availability: 'Available',
    copies: 6,
    coverId: '115'
  },
  {
    id: '16',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    isbn: '978-0374275631',
    subject: 'Science',
    genre: 'Non-Fiction',
    yearPublished: '2011',
    availability: 'Available',
    copies: 9,
    coverId: '116'
  },
  {
    id: '17',
    title: 'The Soul of a New Machine',
    author: 'Tracy Kidder',
    isbn: '978-0316491709',
    subject: 'History',
    genre: 'Non-Fiction',
    yearPublished: '1981',
    availability: 'Available',
    copies: 2,
    coverId: '117'
  },
  {
    id: '18',
    title: 'Zero to One',
    author: 'Peter Thiel',
    isbn: '978-0804139298',
    subject: 'Computer Science',
    genre: 'Non-Fiction',
    yearPublished: '2014',
    availability: 'Available',
    copies: 11,
    coverId: '118'
  },
  {
    id: '19',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    isbn: '978-0307887894',
    subject: 'Computer Science',
    genre: 'Non-Fiction',
    yearPublished: '2011',
    availability: 'Available',
    copies: 15,
    coverId: '119'
  },
  {
    id: '20',
    title: 'The Mythical Man-Month',
    author: 'Frederick Brooks',
    isbn: '978-0201835953',
    subject: 'Computer Science',
    genre: 'Academic',
    yearPublished: '1975',
    availability: 'Available',
    copies: 3,
    coverId: '120'
  },
  {
    id: '21',
    title: 'Code Complete',
    author: 'Steve McConnell',
    isbn: '978-0735619678',
    subject: 'Computer Science',
    genre: 'Academic',
    yearPublished: '1993',
    availability: 'Available',
    copies: 5,
    coverId: '121'
  },
  {
    id: '22',
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell',
    isbn: '978-0136042594',
    subject: 'Computer Science',
    genre: 'Academic',
    yearPublished: '1995',
    availability: 'Available',
    copies: 4,
    coverId: '122'
  },
  {
    id: '23',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0547928227',
    subject: 'Literature',
    genre: 'Fiction',
    yearPublished: '1937',
    availability: 'Available',
    copies: 10,
    coverId: '123'
  },
  {
    id: '24',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '978-0062315007',
    subject: 'Literature',
    genre: 'Fiction',
    yearPublished: '1988',
    availability: 'Available',
    copies: 14,
    coverId: '124'
  },
  {
    id: '25',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0316769488',
    subject: 'Literature',
    genre: 'Fiction',
    yearPublished: '1951',
    availability: 'Available',
    copies: 8,
    coverId: '125'
  },
  {
    id: '26',
    title: 'The Selfish Gene',
    author: 'Richard Dawkins',
    isbn: '978-0198788607',
    subject: 'Science',
    genre: 'Non-Fiction',
    yearPublished: '1976',
    availability: 'Available',
    copies: 5,
    coverId: '126'
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
