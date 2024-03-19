import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByName(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
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
