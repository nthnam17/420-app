import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  username: string

  @Column({ type: 'text' })
  password: string

  @Column({ type: 'text', nullable: true })
  email: string

  @Column({ type: 'int', default: 0, nullable: true })
  status: number
}
