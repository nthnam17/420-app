import { DataSource } from 'typeorm'
import { Users } from '../modules/entities/users.entity'
import path from 'path'
import { Post } from '../modules/entities/post.entity'
import { app } from 'electron'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: path.join(app.getAppPath(), 'database', '420-app.db'),
  synchronize: true,
  entities: [Users, Post]
})

export const connectToDb = async () => {
  try {
    await dataSource.initialize()
    console.log('Connection to database established successfully')
  } catch (e) {
    console.log(e)
    console.log('Connection to database failed')
  }
}
