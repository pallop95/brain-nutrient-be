import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BookRepository } from './book.repository';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository]), AuthModule],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
  exports: [BooksService],
})
export class BooksModule {}
