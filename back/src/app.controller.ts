import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { IPage } from './types/page.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Patch('/list')
  replace(@Body() data: { fromId: number; toId: number }): { message: string } {
    const result = this.appService.replace(data.fromId, data.toId);
    if (!result) throw new InternalServerErrorException();
    return { message: 'ok' };
  }

  @Patch('/list/check')
  check(@Body() data: { id: number }): { message: string } {
    const result = this.appService.check(data.id);
    if (!result) throw new InternalServerErrorException();
    return { message: 'ok' };
  }

  @Get('/list/:page')
  getPage(@Query('q') query: string, @Param('page') page: number = 1): IPage {
    return this.appService.getPage(page, query);
  }
}
