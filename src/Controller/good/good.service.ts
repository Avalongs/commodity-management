import { Injectable } from '@nestjs/common';
import { Good } from './good.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoodDto } from './good.dto';
import { generateOrderId } from 'src/utils';

@Injectable()
export class GoodService {
  constructor(
    @InjectRepository(Good)
    private goodsRepository: Repository<Good>,
  ) {}
  // 查询列表
  async getGoodList(params: {
    page: number;
    pageSize: number;
  }): Promise<{ data: Good[]; total: number }> {
    const { page, pageSize } = params;
    const skip = (page - 1) * pageSize;
    const [data, total] = await this.goodsRepository.findAndCount({
      where: { deleted: 0 },
      select: [
        'id',
        'name',
        'price',
        'goodId',
        // 'picture',
        'buyingPrice',
        'stock',
        'desc',
        'createTime',
        'status',
        'deleted',
      ],
      skip,
      take: pageSize,
    });
    return { data, total };
  }
  add(body: CreateGoodDto): Promise<Good> {
    const newGood = this.goodsRepository.create(body);
    newGood.goodId = generateOrderId();
    return this.goodsRepository.save(newGood);
  }

  async edit(body: CreateGoodDto): Promise<Good> {
    const newGood = this.goodsRepository.create(body);
    if (!newGood.goodId) {
      throw new Error('GoodId是必填字段');
    }
    const existingGood = await this.goodsRepository.findOne({
      where: { goodId: newGood.goodId },
    });
    if (!existingGood) {
      throw new Error('找不到该商品');
    }
    // 更新现有用户的属性
    Object.assign(existingGood, newGood);
    return this.goodsRepository.save(existingGood);
  }
  // 上下架
  // 0:下架,1:上架
  async operate({ operate, goodId }: { operate: number; goodId: string }) {
    const existingGood = await this.goodsRepository.findOne({
      where: { goodId },
    });
    if (!existingGood) {
      throw new Error('找不到该商品');
    }
    existingGood.status = operate;
    return this.goodsRepository.save(existingGood);
  }

  async del(goodId: string) {
    const existingGood = await this.goodsRepository.findOne({
      where: { goodId },
    });
    if (!existingGood) {
      throw new Error('找不到该商品');
    }
    existingGood.deleted = 1;
    return this.goodsRepository.save(existingGood);
  }
}
