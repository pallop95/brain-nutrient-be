import { EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(bookData: Book): Promise<Book> {
    const book = this.create(bookData);
    return this.save(book);
  }

  async updateBook(
    id: string,
    bookData: Partial<Book>,
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
