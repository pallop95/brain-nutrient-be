import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Body() bookData: Book): Promise<Book> {
    return this.booksService.createBook(bookData);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() bookData: Partial<Book>,
  ): Promise<Book | undefined> {
    return this.booksService.updateBook(id, bookData);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }

  @Get(':id')
  async findBookById(@Param('id') id: string): Promise<Book | undefined> {
    return this.booksService.findBookById(id);
  }

  @Get()
  async findAllBooksS(): Promise<Book[]> {
    return this.booksService.findAllBooks();
  }

  // Add more controller methods as needed
}
