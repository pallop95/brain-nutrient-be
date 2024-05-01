import { Chapter } from 'src/chapters/chapter.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  whyRead: string;

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  // @OneToMany(() => Chapter, chapter => chapter.book)
  chapters: Chapter[];
}
