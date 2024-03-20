import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 401 })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.name, signInDto.password);
  }

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 409 })
  @Post('register')
  signup(@Body() signUpDTO: RegisterDto) {
    return this.authService.register(signUpDTO);
  }
}
