import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './order.dto';
import { generateOrderId } from 'src/utils';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  async getOrderList(params: {
    page: number;
    pageSize: number;
  }): Promise<{ data: Order[]; total: number }> {
    const { page, pageSize } = params;
    const skip = (page - 1) * pageSize;
    const [data, total] = await this.orderRepository.findAndCount({
      where: { deleted: 0 },
      select: [
        'id',
        'orderId',
        'createTime',
        'operatorId',
        'operatorName',
        'price',
        'quantity',
        'type',
        'deleted',
      ],
      skip,
      take: pageSize,
    });
    return { data, total };
  }
  operate(body: CreateOrderDto) {
    const newOrder = this.orderRepository.create(body);
    newOrder.orderId = generateOrderId();
    this.orderRepository.save(newOrder);
  }
}
