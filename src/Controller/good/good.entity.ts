import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Good {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '商品唯一标识符' })
  goodId: string;

  @Column({ comment: '商品名称' })
  name: string;

  @Column('decimal', { precision: 10, scale: 2, comment: '商品价格' })
  price: number;

  // @Column('varbinary', { length: 255, comment: '商品图片' })
  // picture: string;

  @Column('decimal', { precision: 10, scale: 2, comment: '商品进货价格' })
  buyingPrice: number;

  @Column({ comment: '商品库存数量' })
  stock: number;

  @Column({ comment: '商品描述', nullable: true })
  desc: string;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    comment: '商品创建时间',
  })
  createTime: Date;

  @Column({ comment: '商品状态(0:下架,1:上架)' })
  status: number;

  @Column({ default: 0, comment: '是否已删除(0:未删除,1:已删除)' })
  deleted: number;
}
