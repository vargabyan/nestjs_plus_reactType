import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { ListUsersService } from './users.service';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserDeleteDto } from './dto/userDelete.dto';

@Controller()
export class ListUsersController {
  constructor(private readonly listUsersService: ListUsersService) {}

  @Get('list')
  getListUsers(): Promise<string> {
    return this.listUsersService.getListUsers();
  }

  @Post('register')
  createUser(@Body() createUser: UserCreateDto): Promise<string> {
    return this.listUsersService.createUser(createUser);
  }

  @Put('edit')
  updateUser(@Body() updateUser: UserUpdateDto): Promise<string> {
    return this.listUsersService.updateUser(updateUser);
  }

  @Delete('delete')
  deleteUser(@Body() userId: UserDeleteDto): Promise<string> {
    return this.listUsersService.deleteUser(userId);
  }
}
