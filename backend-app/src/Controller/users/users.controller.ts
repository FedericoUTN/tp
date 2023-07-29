import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserEmailDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
//@UseGuards(AuthGuard) //permite usar guard en todos los endpoints
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  //@SetMetadata('roles', ['admin'])
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  //@SetMetadata('roles', ['user', 'admin'])
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Get('GetByEmail/:Email')
  async findOneByEmail(@Param('Email') Email: string): Promise<User> {
    return await this.usersService.findUserByEmail(Email);
  }

  @Patch(':email')
  update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserEmailDto,
  ): Promise<UpdateResult> {
    return this.usersService.updateEmail(email, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.usersService.remove(id);
  }
}
