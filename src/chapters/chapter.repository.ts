import { EntityRepository, Repository } from 'typeorm';
import { Chapter } from './chapter.entity';

@EntityRepository(Chapter)
export class ChapterRepository extends Repository<Chapter> {
  async createChapter(chapterData: Chapter): Promise<Chapter> {
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
