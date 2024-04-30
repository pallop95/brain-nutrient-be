import { Controller, Get, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { AppService } from './app.service';

@Controller()
@ApiTags('Swagger')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('json')
  @ApiResponse({ status: 200, description: 'Swagger JSON file' })
  async getJson(@Res() res: Response): Promise<void> {
    const filePath = resolve(__dirname, '../openAPI/swagger.json');
    const content = readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(content);
  }
}
