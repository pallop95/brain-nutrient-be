import { Chapter } from 'src/chapters/chapter.model';

// src/books/book.model.ts
export class Book {
  id: string;
  name: string;
  whyRead: string;
  chapters: Chapter[];
}
