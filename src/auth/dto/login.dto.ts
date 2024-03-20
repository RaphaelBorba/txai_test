import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'Fulano Ciclano',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Senha Secreta',
    required: true,
  })
  @IsString()
  password: string;
}
