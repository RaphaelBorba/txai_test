import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Celular',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1500,
    required: true,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: '2022-03-19T12:30:45Z',
    required: true,
  })
  @IsDateString()
  register_date: Date;
}
