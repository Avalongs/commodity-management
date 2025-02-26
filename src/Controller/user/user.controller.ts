import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/list')
  async getUserList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    return this.service.getUserList({ page, pageSize });
  }

  @Post('/add')
  @UsePipes(new ValidationPipe())
  async userAdd(@Body() body: CreateUserDto) {
    return this.service.userAdd(body);
  }

  @Post('/edit')
  @UsePipes(new ValidationPipe())
  async userEdit(@Body() updateUserDto: CreateUserDto) {
    return this.service.userEdit(updateUserDto);
  }

  @Delete('/del')
  async userDel(@Query('userId') userId: string) {
    return this.service.userDel(userId);
  }

  @Post('/login')
  async login(@Body() body: User) {
    const { username, password } = body;
    const isLoggedIn = await this.service.login(username, password);
    if (isLoggedIn) {
      return {
        message: '登录成功',
      };
    } else {
      throw new HttpException('登录失败', HttpStatus.BAD_REQUEST);
    }
  }
}
