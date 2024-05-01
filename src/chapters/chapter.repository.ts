import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Chapter } from './chapter.entity';
import { Injectable } from '@nestjs/common';
import { ChapterDto } from './dto/chapter.dto';

@Injectable()
@EntityRepository(Chapter)
export class ChapterRepository extends Repository<Chapter> {
  constructor(private dataSource: DataSource) {
    super(Chapter, dataSource.createEntityManager());
  }

  async createChapter(chapterData: ChapterDto): Promise<Chapter> {
    const chapter = this.create(chapterData);
    return this.save(chapter);
  }

  async updateChapter(
    id: string,
    chapterData: Partial<Chapter>,
  ): Promise<Chapter | undefined> {
    await this.update(id, chapterData);
    return this.findOneById(id);
  }

  async deleteChapter(id: string): Promise<void> {
    await this.delete(id);
  }

  async findChapterById(id: string): Promise<Chapter | undefined> {
    return this.findOneById(id);
  }

  async findAllChapters(): Promise<Chapter[]> {
    return this.find();
  }
}
