import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  title: string

  @Column({ type: 'text' })
  descripton: string

  @Column({ type: 'text' })
  created_by: string
}
