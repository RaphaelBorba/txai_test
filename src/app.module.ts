import { Module } from '@nestjs/common';

import { PrismaService } from './database/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule],
  providers: [PrismaService],
})
export class AppModule {}
