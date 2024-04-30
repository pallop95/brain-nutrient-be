import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BookRepository } from './book.repository';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository])],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
  exports: [BooksService],
})
export class BooksModule {}
