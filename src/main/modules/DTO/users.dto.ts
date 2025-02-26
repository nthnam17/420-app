import { IsNotEmpty } from 'class-validator'

export interface ListUsersDto {
  keyword: string
}

export class CreateUsersDto {
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống !' })
  username: string

  name: string

  password: string

  email: string

  status: number
}

export class UpdateUsersDto {
  @IsNotEmpty()
  id: number

  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống !' })
  username: string

  name: string

  password: string

  email: string

  status: number
}
