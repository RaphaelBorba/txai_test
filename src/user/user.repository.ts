import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private userdb = this.prismaService.user;

  create(createUserDto: CreateUserDto) {
    const { name, password, role } = createUserDto;
    return this.userdb.create({
      data: {
        name,
        password,
        role,
      },
    });
  }

  findAll() {
    return this.userdb.findMany({});
  }

  findByName(name: string) {
    return this.userdb.findFirst({
      where: {
        name,
      },
    });
  }

  findOne(id: number) {
    return this.userdb.findFirst({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { name, password, role } = updateUserDto;
    return this.userdb.update({
      where: { id },
      data: {
        name,
        password,
        role,
      },
    });
  }

  remove(id: number) {
    return this.userdb.delete({
      where: { id },
    });
  }
}
