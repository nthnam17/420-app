import { Users } from '../entities/users.entity'
import { CreateUsersDto, ListUsersDto, UpdateUsersDto } from '../DTO/users.dto'
import { dataSource } from '../../config'

const usersRepository = dataSource.getRepository(Users)

export const getListUsers = async (params: ListUsersDto) => {
  try {
    const queryBuilder = usersRepository.createQueryBuilder('users')

    const { keyword } = params

    if (keyword && keyword !== '') {
      queryBuilder
        .where('users.username LIKE :keyword', { keyword: `%${keyword}%` })
        .orWhere('users.name LIKE :keyword', { keyword: `%${keyword}%` })
    }
    const data = await queryBuilder.getMany()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const addUser = async (payload: CreateUsersDto) => {
  try {
    const newUser = new Users()
    newUser.email = payload.email
    newUser.name = payload.name
    newUser.password = payload.password
    newUser.username = payload.username
    newUser.status = payload.status

    const data = dataSource.manager.save(Users, newUser)

    return data
  } catch (e) {
    console.log(e)
    return
  }
}

export const updateUser = async (payload: UpdateUsersDto) => {
  try {
    const data = await usersRepository.update(payload.id, payload)

    if (!data) {
      return
    }
  } catch (e) {
    console.log(e)
    return
  }
}

export const deleteUser = async (id) => {
  try {
    await usersRepository.delete(id)
  } catch (e) {
    console.log(e)
    return
  }
}
