import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  private SALT = 10;

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByName(username);
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Nome e/ou senha errado!');
    }
    const payload = { user_id: user.id, username: user.name, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(signUpDTO: RegisterDto) {
    try {
      return await this.userService.create(signUpDTO);
    } catch (error) {
      throw error;
    }
  }
}
