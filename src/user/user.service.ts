import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private SALT = 10;

  async create(createUserDto: CreateUserDto) {
    const existName = await this.findByName(createUserDto.name);
    if (existName) throw new ConflictException('Nome já cadastrado!');
    const hash = await bcrypt.hash(createUserDto.password, this.SALT);

    try {
      const newUser = await this.userRepository.create({
        ...createUserDto,
        password: hash,
      });
      return newUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('Usuário não encontrado!');
    return user;
  }

  findByName(name: string) {
    return this.userRepository.findByName(name);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findById(id);

    try {
      const updatedUser = await this.userRepository.update(id, updateUserDto);
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    await this.findById(id);

    try {
      return this.userRepository.remove(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
