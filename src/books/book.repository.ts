import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';
import { BookDto } from './dto/book.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  constructor(private dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async createBook(bookData: BookDto): Promise<Book> {
    const book = this.create(bookData);
    return this.save(book);
  }

  async updateBook(
    id: string,
    bookData: Partial<BookDto>,
  ): Promise<Book | undefined> {
    await this.update(id, bookData);
    return this.findOneById(id);
  }

  async deleteBook(id: string): Promise<void> {
    await this.delete(id);
  }

  async findBookById(id: string): Promise<Book | undefined> {
    return this.findOneById(id);
  }

  async findAllBooks(): Promise<Book[]> {
    return this.find();
  }
}
