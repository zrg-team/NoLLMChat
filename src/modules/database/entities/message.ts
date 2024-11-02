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
import { MessageFromEnum, MessageStatusEnum } from '../types/message'
import { LLM } from './llm'

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
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column('uuid')
  parent_message_id?: string
  @ManyToOne(() => Message, (thread) => thread.message)
  @JoinColumn({ name: 'parent_message_id' })
  message?: Message

  @Column('uuid')
  thread_id: string
  @ManyToOne(() => Thread, (thread) => thread.messages)
  @JoinColumn({ name: 'task_id' })
  thread?: Thread

  @Column('uuid')
  llm_id: string
  @ManyToOne(() => LLM, (llm) => llm.messages)
  @JoinColumn({ name: 'llm_id' })
  llm?: LLM
}
