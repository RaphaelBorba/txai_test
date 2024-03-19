import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  async getHello() {
    const products = await this.prismaService.product.findMany();
    return products;
  }
}
