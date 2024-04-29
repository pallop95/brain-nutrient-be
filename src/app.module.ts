import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { ChaptersController } from './chapters/chapters.controller';
import { BooksService } from './books/books.service';
import { ChaptersService } from './chapters/chapters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/book.entity';
import { Chapter } from './chapters/chapter.entity';
import { BookRepository } from './books/book.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/database.sqlite', // SQLite database file path
      entities: [Book, Chapter], // "entities": ["dist/**/*.entity{.ts,.js}"],
      synchronize: true, // Automatically creates database schema (for development only)
    }),
  ],
  controllers: [AppController, BooksController, ChaptersController],
  providers: [AppService, BooksService, ChaptersService, BookRepository],
})
export class AppModule {}
