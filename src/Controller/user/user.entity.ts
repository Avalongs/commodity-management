import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: '用户主键ID' })
  id: number;

  @Column({ comment: '用户唯一标识符' })
  userId: string;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    comment: '用户创建时间',
  })
  createTime: Date;

  @Column({ comment: '用户名（登录名）' })
  username: string;

  @Column({ comment: '用户密码（建议加密存储）' })
  password: string;

  @Column({ comment: '用户真实姓名' })
  name: string;

  @Column({ comment: '用户手机号码' })
  phone: string;

  @Column({ comment: '用户描述或备注信息' })
  desc: string;

  @Column({ default: 0, comment: '是否已删除(0:未删除,1:已删除)' })
  deleted: number;
}
