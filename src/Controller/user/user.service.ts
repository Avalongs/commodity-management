import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { generateOrderId } from '../../utils';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 查询列表
  async getUserList(params: {
    page: number;
    pageSize: number;
  }): Promise<{ data: User[]; total: number }> {
    const { page, pageSize } = params;
    const skip = (page - 1) * pageSize;
    const [data, total] = await this.usersRepository.findAndCount({
      where: { deleted: 0 },
      select: [
        'id',
        'userId',
        'username',
        'createTime',
        'name',
        'phone',
        'desc',
        'deleted',
      ],
      skip,
      take: pageSize,
    });
    return { data, total };
  }

  // 添加用户
  async userAdd(user: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(user);
    if (!newUser.password) {
      throw new Error('Password is required');
    }
    const salt = await bcrypt.genSalt();
    newUser.userId = generateOrderId();
    newUser.password = await bcrypt.hash(newUser.password, salt);
    return this.usersRepository.save(newUser);
  }

  // 修改用户
  async userEdit(updateUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(updateUserDto);
    if (!newUser.userId) {
      throw new Error('UserId是必填字段');
    }
    const existingUser = await this.usersRepository.findOne({
      where: { userId: newUser.userId },
    });
    if (!existingUser) {
      throw new Error('找不到该用户');
    }
    if (newUser.password) {
      const salt = await bcrypt.genSalt();
      newUser.password = await bcrypt.hash(newUser.password, salt);
    }
    // 更新现有用户的属性
    Object.assign(existingUser, newUser);
    return this.usersRepository.save(existingUser);
  }

  // 删除用户
  async userDel(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('UserId是必填字段');
    }
    const existingUser = await this.usersRepository.findOne({
      where: { userId },
    });
    if (!existingUser) {
      throw new Error('找不到该用户');
    }
    existingUser.deleted = 1;
    await this.usersRepository.save(existingUser);
  }

  // 登录
  async login(username: string, password: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return true; // 登录成功
    }
    return false; // 登录失败
  }
}
