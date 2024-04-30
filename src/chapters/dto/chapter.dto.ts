import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ChapterDto {
  // @IsString()
  // @IsNotEmpty()
  // id: string;
  // @IsString()
  // @IsNotEmpty()
  // bookId: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ example: 'Chapter 1' })
  title: string;

  @IsString()
  @MaxLength(1000)
  @ApiProperty({ example: 'step1' })
  what: string;

  @IsString()
  @MaxLength(1000)
  @ApiProperty({ example: 'Just read' })
  how: string;

  @IsString()
  @MaxLength(1000)
  @ApiProperty({ example: 'For god sake' })
  whyRead: string;
}
