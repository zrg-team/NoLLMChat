import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Message } from './entry'
import { ThreadStatusEnum } from '../types/thread'

@Entity({ name: 'threads' })
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  title: string

  @Column({ type: 'text' })
  status: `${ThreadStatusEnum}`

  @Column({ type: 'text' })
  projectSlug: string

  @Column({ type: 'text', nullable: true })
  userId?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Message, (message) => message.thread)
  messages?: Message[]
}
