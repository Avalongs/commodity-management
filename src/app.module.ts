import { Module } from '@nestjs/common';
import { GoodController } from './Controller/good/good.controller';
import { GoodService } from './Controller/good/good.service';
import { OrderController } from './Controller/order/order.controller';
import { OrderService } from './Controller/order/order.service';
import { UserController } from './Controller/user/user.controller';
import { UserService } from './Controller/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Controller/user/user.entity';
import { Good } from './Controller/good/good.entity';
import { Order } from './Controller/order/order.entity';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // MySQL服务器地址
      port: 3306, // MySQL端口
      username: 'root', // 数据库用户名
      password: 'deng725824', // 数据库密码
      database: 'commodity', // 数据库名称
      entities: [User, Good, Order], // 你的实体类
      synchronize: true, // 自动同步数据库（开发阶段可以使用，生产环境建议设置为false）
    }),
    TypeOrmModule.forFeature([User, Good, Order]), // 导入实体
  ],
  controllers: [GoodController, OrderController, UserController],
  providers: [
    GoodService,
    OrderService,
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
