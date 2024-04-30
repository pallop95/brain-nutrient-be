import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ChapterDto } from 'src/chapters/dto/chapter.dto';

// src/books/book.model.ts
export class BookDto {
  // @IsNotEmpty()
  // @ApiProperty({ example: '123456' })
  // id: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'How to use this app.' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Know how to use this app.' })
  whyRead: string;

  @ValidateNested({ each: true })
  @ApiProperty({ example: [] })
  chapters: ChapterDto[];
}
