import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChaptersController } from './chapters.controller';
import { ChapterRepository } from './chapter.repository';
import { ChaptersService } from './chapters.service';
import { Chapter } from './chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, ChapterRepository])],
  controllers: [ChaptersController],
  providers: [ChaptersService, ChapterRepository],
  exports: [ChaptersService],
})
export class ChaptersModule {}
