import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';

@Controller('/order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get('/list')
  async getOrderList(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('pageSize', new DefaultValuePipe(10)) pageSize: number,
  ) {
    return this.service.getOrderList({ page, pageSize });
  }

  @Post('/operate')
  async operate(@Body() body: CreateOrderDto) {
    return this.service.operate(body);
  }
}
