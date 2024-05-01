import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChaptersController } from './chapters.controller';
import { ChapterRepository } from './chapter.repository';
import { ChaptersService } from './chapters.service';
import { Chapter } from './chapter.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, ChapterRepository]), AuthModule],
  controllers: [ChaptersController],
  providers: [ChaptersService, ChapterRepository],
  exports: [ChaptersService],
})
export class ChaptersModule {}
