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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/database.sqlite', // SQLite database file path
      entities: [Book, Chapter],
      synchronize: true, // Automatically creates database schema (for development only)
    }),
  ],
  controllers: [AppController, BooksController, ChaptersController],
  providers: [AppService, BooksService, ChaptersService],
})
export class AppModule {}
