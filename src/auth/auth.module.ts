import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
    }),
  ],
  providers: [AuthService, UserService, UserRepository, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
