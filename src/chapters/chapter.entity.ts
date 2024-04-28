import { Book } from 'src/books/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  what: string;

  @Column()
  how: string;

  @Column()
  whyRead: string;

  @ManyToOne(() => Book, (book) => book.chapters)
  book: Book;
}
