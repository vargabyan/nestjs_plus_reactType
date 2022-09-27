export class UserUpdateDto {
  readonly id: number;
  readonly email: string;
  readonly lastname: string;
  readonly firstname: string;
  readonly age: string;
}

export class UserUpdateNewParamsDto {
  readonly lastname: string;
  readonly firstname: string;
  readonly age: string;
}
