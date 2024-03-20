import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as RequestType } from 'express';
import { JWT_Request } from 'src/types/jwtRequest';

@UseGuards(AuthGuard(false))
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Request() req: RequestType & { user: JWT_Request },
  ) {
    return this.productService.create(createProductDto, req.user.user_id);
  }

  @Get()
  findAll(@Request() req: RequestType & { user: JWT_Request }) {
    return this.productService.findAll(req.user.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req: RequestType & { user: JWT_Request },
  ) {
    return this.productService.update(+id, updateProductDto, req.user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req: RequestType & { user: JWT_Request },
  ) {
    return this.productService.remove(+id, req.user);
  }
}
