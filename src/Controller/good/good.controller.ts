import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GoodService } from './good.service';
import { CreateGoodDto } from './good.dto';

@Controller('/good')
export class GoodController {
  constructor(private readonly service: GoodService) {}

  @Get('/list')
  async getGoodList(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('pageSize', new DefaultValuePipe(10)) pageSize: number,
  ) {
    return this.service.getGoodList({ page, pageSize });
  }

  @Post('/add')
  @UsePipes(new ValidationPipe())
  async add(@Body() body: CreateGoodDto) {
    return this.service.add(body);
  }

  @Post('/edit')
  @UsePipes(new ValidationPipe())
  async edit(@Body() body: CreateGoodDto) {
    return this.service.edit(body);
  }

  @Post('/operate')
  async operate(
    @Query('operate') operate: number,
    @Query('goodId') goodId: string,
  ) {
    return this.service.operate({ operate, goodId });
  }

  @Delete('/del')
  async del(@Query('goodId') goodId: string) {
    return this.service.del(goodId);
  }
}
