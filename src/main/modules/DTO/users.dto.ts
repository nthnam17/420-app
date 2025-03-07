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
  id: number

  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống !' })
  username: string

  name: string

  password: string

  email: string

  phone: string

  avartar: string

  cookie: string

  token: string

  status: number
}
