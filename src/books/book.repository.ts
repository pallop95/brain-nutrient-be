import { DataSource, EntityRepository, Repository, Transaction } from 'typeorm';
import { Book } from './book.entity';
import { BookDto } from './dto/book.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ChaptersService } from 'src/chapters/chapters.service';
import { Chapter } from 'src/chapters/chapter.entity';

@Injectable()
@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  constructor(
    private dataSource: DataSource,
    private chaptersService: ChaptersService,
  ) {
    super(Book, dataSource.createEntityManager());
  }

  async createBook(bookData: BookDto): Promise<Book> {
    /*
    const book = this.create(bookData);
    return this.save(book);
    */
    const book = new Book();
    book.name = bookData.name;
    book.whyRead = bookData.whyRead;
    // book.chapters = bookData.chapters as Chapter[];
  
    return this.save(book);
  }

  /*
  async createBookWithChapters(bookData: BookDto, @TransactionRepository(Chapter) chapterRepository?: Repository<Chapter>): Promise<Book> {
    const { chapters, ...bookDto } = bookData; // Extract chapters from bookData

    const book = this.create(bookDto); // Create Book entity

    if (chapters && chapters.length > 0) {
      const savedBook = await this.save(book); // Save Book entity

      const chaptersEntities = chapters.map((chapterData) => {
        const chapter = chapterRepository.create({
          ...chapterData,
          book: savedBook, // Assign book relationship
        });
        return chapter;
      });

      await chapterRepository.save(chaptersEntities); // Save Chapter entities
    } else {
      await this.save(book); // If no chapters, save Book entity without chapters
    }

    return book;
  }
  */

  async updateBook(
    id: string,
    bookData: BookDto,
  ): Promise<Book | undefined> {
    const foundBook = await this.findOne({
      where: {
        id
      },
      relations: ['chapters']
    });
    if (!foundBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    const { name, whyRead, chapters } = bookData;
    if (name) foundBook.name = name;
    if (whyRead) foundBook.whyRead = whyRead;
   
    if (chapters) {
      // Remove existing todo items
      foundBook.chapters = [];
  
      // Create new todo items and associate them with the todo list
      for (const chapter of chapters) {
        const newChapter = new Chapter();
        newChapter.title = chapter.title;
        newChapter.what = chapter.what;
        newChapter.whyRead = chapter.whyRead;
        newChapter.how = chapter.how;
        const newChap = await this.chaptersService.createChapter(newChapter);
        console.log(newChap);
        foundBook.chapters.push(newChap);
      }
    }
  
    return this.save(foundBook);
  }

  async deleteBook(id: string): Promise<void> {
    await this.delete(id);
  }

  async findBookById(id: string): Promise<Book | undefined> {
    // return this.findOneById(id);
    return this.findOne({ where: { id }, relations: ['chapters'] });
  }

  async findAllBooks(): Promise<Book[]> {
    return this.find();
  }
}
