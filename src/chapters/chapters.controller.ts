import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Chapter } from './chapter.entity';
import { ChaptersService } from './chapters.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BookDto } from 'src/books/dto/book.dto';
import { ChapterDto } from './dto/chapter.dto';

@Controller('chapters')
@ApiTags('ChaptersController')
@UseGuards(AuthGuard())
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: ChapterDto })
  async createChapter(@Body() chapterData: ChapterDto): Promise<ChapterDto> {
    return this.chaptersService.createChapter(chapterData);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ChapterDto })
  async updateChapter(
    @Param('id') id: string,
    @Body() chapterData: ChapterDto,
  ): Promise<ChapterDto | undefined> {
    return this.chaptersService.updateChapter(id, chapterData);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  async deleteChapter(@Param('id') id: string): Promise<void> {
    return this.chaptersService.deleteChapter(id);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ChapterDto })
  async findChapterById(@Param('id') id: string): Promise<ChapterDto | undefined> {
    return this.chaptersService.findChapterById(id);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [ChapterDto] })
  async findAllChaptersS(): Promise<ChapterDto[]> {
    return this.chaptersService.findAllChapters();
  }

  // Add more controller methods as needed
}
