import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BookRepository } from './book.repository';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ChaptersModule } from 'src/chapters/chapters.module';
import { ChaptersService } from 'src/chapters/chapters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository]), AuthModule, ChaptersModule],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
  exports: [BooksService],
})
export class BooksModule {}
