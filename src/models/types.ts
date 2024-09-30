export interface User {
    userId: string;
    username: string;
    password: string;
  }
  
  export interface Book {
    bookId: string;
    title: string;
    author: string;
    coverImage?: string;
  }
  
  export interface UserBooks {
    [userId: string]: Book[];
  }
  
  export interface Database {
    users: User[];
    userBooks: UserBooks;
  }