import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/users/user.entity';
import { UserUpdateDto, UserUpdateNewParamsDto } from './dto/userUpdate.dto';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserDeleteDto } from './dto/userDelete.dto';

@Injectable()
export class ListUsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async deleteUser(params: UserDeleteDto): Promise<string> {
    let data;
    await this.usersRepository
      .destroy<User>({ where: { id: params.id } })
      .then((user) => {
        data = user;
      })
      .catch((err) => console.log(err));
    return data;
  }

  async updateUser(params: UserUpdateDto): Promise<string> {
    const updatUserParams: UserUpdateNewParamsDto = {
      firstname: params.firstname,
      lastname: params.lastname,
      age: params.age,
    };
    let data;
    await this.usersRepository
      .update<User>(updatUserParams, { where: { id: params.id } })
      .then((user) => {
        data = user;
      })
      .catch((err) => console.log(err));
    return data;
  }

  async createUser(params: UserCreateDto): Promise<string> {
    const creatParams = {
      email: params.email,
      firstname: params.firstname,
      lastname: params.lastname,
      age: params.age,
    };
    let data;
    await this.usersRepository
      .findOne<User>({ where: { email: params.email }, raw: true })
      .then(async (result) => {
        if (result) {
          if (result.email === params.email) data = false;
        } else {
          await this.usersRepository
            .create<User>(creatParams)
            .then((user) => {
              data = user;
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
    return data;
  }

  async getListUsers(): Promise<string> {
    let data;
    await this.usersRepository
      .findAll<User>({ raw: true })
      .then((users) => {
        data = users;
      })
      .catch((err) => console.log(err));
    return data;
  }
}
