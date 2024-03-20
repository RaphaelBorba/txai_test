import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  amount: number;

  @IsDateString()
  register_date: Date;
}
