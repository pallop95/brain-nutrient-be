import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Chapter } from './chapter.entity';
import { ChaptersService } from './chapters.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('chapters')
@ApiTags('Chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  async createChapter(@Body() chapterData: Chapter): Promise<Chapter> {
    return this.chaptersService.createChapter(chapterData);
  }

  @Put(':id')
  async updateChapter(
    @Param('id') id: string,
    @Body() chapterData: Partial<Chapter>,
  ): Promise<Chapter | undefined> {
    return this.chaptersService.updateChapter(id, chapterData);
  }

  @Delete(':id')
  async deleteChapter(@Param('id') id: string): Promise<void> {
    return this.chaptersService.deleteChapter(id);
  }

  @Get(':id')
  async findChapterById(@Param('id') id: string): Promise<Chapter | undefined> {
    return this.chaptersService.findChapterById(id);
  }

  @Get()
  async findAllChaptersS(): Promise<Chapter[]> {
    return this.chaptersService.findAllChapters();
  }

  // Add more controller methods as needed
}
