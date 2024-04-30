import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Body() bookData: BookDto): Promise<BookDto> {
    return this.booksService.createBook(bookData);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() bookData: Partial<BookDto>,
  ): Promise<BookDto | undefined> {
    return this.booksService.updateBook(id, bookData);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }

  @Get(':id')
  async findBookById(@Param('id') id: string): Promise<BookDto | undefined> {
    return this.booksService.findBookById(id);
  }

  @Get()
  async findAllBooksS(): Promise<BookDto[]> {
    return this.booksService.findAllBooks();
  }

  // Add more controller methods as needed
}
