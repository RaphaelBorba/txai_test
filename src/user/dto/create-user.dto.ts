import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Fulano Ciclano',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'senhaSecreta',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'admin | user ',
    required: true,
  })
  @IsString()
  role: string;
}
