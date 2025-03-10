import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'nvarchar' })
  name: string

  @Column({ type: 'nvarchar' })
  username: string

  @Column({ type: 'nvarchar', nullable: true })
  avartar: string

  @Column({ type: 'nvarchar', nullable: true })
  token: string

  @Column({ type: 'nvarchar', nullable: true })
  cookie: string

  @Column({ type: 'nvarchar', nullable: true })
  phone: string

  @Column({ type: 'nvarchar' })
  password: string

  @Column({ type: 'nvarchar', nullable: true })
  email: string

  @Column({ type: 'int', default: 0, nullable: true })
  status: number
}
