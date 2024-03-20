import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private prismaService: PrismaService) {}

  private productdb = this.prismaService.product;

  create(createProductDto: CreateProductDto, userId: number) {
    const { amount, name, price, register_date } = createProductDto;
    return this.productdb.create({
      data: {
        amount,
        name,
        price,
        register_date,
        user_id: userId,
      },
    });
  }

  findAll(userId: number) {
    return this.productdb.findMany({ where: { user_id: userId } });
  }

  findOne(id: number) {
    return this.productdb.findFirst({
      where: { id },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const { amount, name, price, register_date } = updateProductDto;
    return this.productdb.update({
      where: {
        id,
      },
      data: {
        amount,
        name,
        price,
        register_date,
      },
    });
  }

  remove(id: number) {
    return this.productdb.delete({
      where: { id },
    });
  }
}
