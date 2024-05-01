import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/user/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('books')
@ApiTags('BooksController')
@UseGuards(AuthGuard())
export class BooksController {
  private readonly logger = new Logger(BooksController.name);

  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: BookDto })
  async createBook(@Body() bookData: BookDto): Promise<BookDto> {
    return this.booksService.createBook(bookData);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: BookDto })
  async updateBook(
    @Param('id') id: string,
    @Body() bookData: BookDto,
  ): Promise<BookDto | undefined> {
    return this.booksService.updateBook(id, bookData);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: BookDto,
  })
  async findBookById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<BookDto | undefined> {
    this.logger.log('findBookById User : ', user);
    return this.booksService.findBookById(id);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [BookDto] })
  async findAllBooks(@GetUser() user: User): Promise<BookDto[]> {
    this.logger.log('findAllBooks User : ', user);
    return this.booksService.findAllBooks();
  }

  // Add more controller methods as needed
}
