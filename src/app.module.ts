import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { ChaptersController } from './chapters/chapters.controller';
// import { BooksService } from './books/books.service';
// import { ChaptersService } from './chapters/chapters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Book } from './books/book.entity';
// import { Chapter } from './chapters/chapter.entity';
// import { BookRepository } from './books/book.repository';
// import { ChapterRepository } from './chapters/chapter.repository';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { User } from './user/user.entity';
import { BooksModule } from './books/books.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/database.sqlite', // SQLite database file path
      // entities: [Book, Chapter, User], // "entities": ["dist/**/*.entity{.ts,.js}"],
      synchronize: true, // Automatically creates database schema (for development only)
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    BooksModule,
    ChaptersModule,
    ConfigModule,
  ],
  controllers: [
    AppController,
    BooksController,
    ChaptersController,
    // UserController,
  ],
  providers: [
    AppService,
    // BooksService,
    // BookRepository,
    // ChaptersService,
    // ChapterRepository,
    // UserService,
    // UserRepository,
  ],
})
export class AppModule {}
