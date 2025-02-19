import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async createBook(bookData: BookDto): Promise<Book> {
    return this.bookRepository.createBook(bookData);
  }

  async updateBook(
    id: string,
    bookData: BookDto,
  ): Promise<Book | undefined> {
    return this.bookRepository.updateBook(id, bookData);
  }

  async deleteBook(id: string): Promise<void> {
    return this.bookRepository.deleteBook(id);
  }

  async findBookById(id: string): Promise<Book | undefined> {
    return this.bookRepository.findBookById(id);
  }

  async findAllBooks(): Promise<Book[]> {
    return this.bookRepository.findAllBooks();
  }

  // Add more service methods as needed
}
