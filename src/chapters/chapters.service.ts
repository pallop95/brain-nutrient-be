import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from './chapter.entity';
import { ChapterRepository } from './chapter.repository';
import { ChapterDto } from './dto/chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(ChapterRepository)
    private readonly chapterRepository: ChapterRepository,
  ) {}

  async createChapter(chapterData: ChapterDto): Promise<Chapter> {
    return this.chapterRepository.createChapter(chapterData);
  }

  async updateChapter(
    id: string,
    chapterData: Partial<Chapter>,
  ): Promise<Chapter | undefined> {
    return this.chapterRepository.updateChapter(id, chapterData);
  }

  async deleteChapter(id: string): Promise<void> {
    return this.chapterRepository.deleteChapter(id);
  }

  async findChapterById(id: string): Promise<Chapter | undefined> {
    return this.chapterRepository.findChapterById(id);
  }

  async findAllChapters(): Promise<Chapter[]> {
    return this.chapterRepository.findAllChapters();
  }

  // Add more service methods as needed
}
