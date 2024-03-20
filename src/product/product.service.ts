import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { UserService } from 'src/user/user.service';
import { JWT_Request } from 'src/types/jwtRequest';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userService: UserService,
  ) {}

  async create(createProductDto: CreateProductDto, userId: number) {
    try {
      const newProduct = await this.productRepository.create(
        createProductDto,
        userId,
      );
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(userId: number) {
    const products = await this.productRepository.findAll(userId);
    if (!products[0]) return 'Você não tem nenhum produto cadastrado!';
    return products;
  }

  async findById(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException('Produto não encontrado!');
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    reqUser: JWT_Request,
  ) {
    const product = await this.findById(id);

    if (reqUser.role !== 'admin' || product.user_id !== reqUser.user_id) {
      throw new ConflictException(
        'Para remover ou atualizar um produto, precisa ser admin ou dono do produto',
      );
    }

    try {
      const updatedProduct = await this.productRepository.update(
        id,
        updateProductDto,
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number, reqUser: JWT_Request) {
    const product = await this.findById(id);

    if (reqUser.role !== 'admin' || product.user_id !== reqUser.user_id) {
      throw new ConflictException(
        'Para remover ou atualizar um produto, precisa ser admin ou dono do produto',
      );
    }
    try {
      return await this.productRepository.remove(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
