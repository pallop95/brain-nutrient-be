import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Post,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';

@Public()
@Controller('dummy')
@ApiTags('DummyController')
export class DummyController {
  private readonly logger = new Logger(DummyController.name);

  @Get('not-found')
  generateNotFoundError() {
    this.logger.log('Generating NotFoundError');
    throw new NotFoundException('Resource not found');
  }

  @Post('bad-request')
  generateBadRequestError(@Body() data: any) {
    this.logger.log('Generating BadRequestError');
    if (!data || !data.name) {
      throw new BadRequestException('Name is required');
    }
    return { message: 'Request processed successfully' };
  }

  @Get('internal-server-error')
  generateInternalServerError() {
    this.logger.log('Generating InternalServerError');
    throw new InternalServerErrorException(
      'Something went wrong on the server',
    );
  }

  @Get('timeout')
  async generateTimeoutError() {
    this.logger.log('Generating RequestTimeoutError');
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a long-running operation
    throw new RequestTimeoutException('Request timed out');
  }

  @Get('validation-error/:id')
  generateValidationError(@Param('id') id: number) {
    this.logger.log('Generating ValidationError');
    if (isNaN(id)) {
      throw new HttpException('Invalid ID', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return { id };
  }

  @Get('unauthorized')
  generateUnauthorizedError() {
    this.logger.log('Generating UnauthorizedError');
    throw new UnauthorizedException('Unauthorized access');
  }
}
