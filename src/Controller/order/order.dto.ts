// src/Controller/order/order.dto.ts
import { IsNotEmpty, IsString, IsDecimal, IsInt } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  operatorId: string;

  @IsNotEmpty()
  @IsString()
  operatorName: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  price: number;

  // @IsNotEmpty()
  // @IsString()
  // picture: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  type: number;
}
