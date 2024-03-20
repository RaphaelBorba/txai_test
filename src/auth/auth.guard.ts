import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

type JWTPayload = {
  user_id: number;
  username: string;
  role: string;
};

export const AuthGuard = (routeAdmin?: boolean) => {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(
      readonly jwtService: JwtService,
      readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token Necessário!');
      }
      let payload: JWTPayload;
      try {
        payload = await this.jwtService.verifyAsync<JWTPayload>(token, {
          secret: process.env.JWT_KEY,
        });
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException();
      }
      try {
        await this.userService.findById(payload.user_id);
      } catch (error) {
        throw new BadRequestException('Usuário não cadastrado!');
      }

      if (routeAdmin) {
        if (payload.role !== 'admin') {
          throw new UnauthorizedException('Rota de Admin!');
        }
      }

      request['user'] = payload;
      return true;
    }

    extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }

  const guard = mixin(AuthGuardMixin);
  return guard;
};
