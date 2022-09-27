import { Module } from '@nestjs/common';
import { ListUsersController } from './users.controller';
import { ListUsersService } from './users.service';
import { usersProviders } from '../models/users/users.providers';

@Module({
  controllers: [ListUsersController],
  providers: [ListUsersService, ...usersProviders],
})
export class ListUsersModule {}
