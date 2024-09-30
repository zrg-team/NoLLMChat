import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Thread } from './entry'
import {
  MessageFromEnum,
  MessageStatusEnum,
} from '../types/message'

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'text' })
  from: `${MessageFromEnum}`

  @Column({ type: 'text' })
  status: `${MessageStatusEnum}`

  @Column({ type: 'text', nullable: true })
  metadata?: string

  @Column({ type: 'text', nullable: true })
  output?: string

  @Column({ type: 'boolean', nullable: true })
  hidden?: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column('uuid')
  thread_id: string
  @ManyToOne(() => Thread, (thread) => thread.messages)
  @JoinColumn({ name: 'task_id' })
  thread?: Thread
}
