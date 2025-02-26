import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGoodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  goodId: string;

  // @IsNotEmpty()
  // @IsString()
  // picture: string;

  @IsNotEmpty()
  @IsNumber()
  buyingPrice: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;
}
