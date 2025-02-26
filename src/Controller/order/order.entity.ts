import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ comment: '订单主键ID' })
  id: number;

  @Column({ comment: '订单唯一标识符' })
  orderId: string;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    comment: '订单创建时间',
  })
  createTime: Date;

  @Column({ comment: '操作人ID' })
  operatorId: string;

  @Column({ comment: '操作人名称' })
  operatorName: string;

  @Column('decimal', { precision: 10, scale: 2, comment: '订单总金额' })
  price: number;

  // @Column('varbinary', { length: 255, comment: '订单相关图片' })
  // picture: string;

  @Column({ comment: '订单商品数量' })
  quantity: number;

  @Column({ comment: '订单状态(0:出货,1:进货)' })
  type: number;

  @Column({ default: 0, comment: '是否已删除(0:未删除,1:已删除)' })
  deleted: number;
}
