import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { LLM, Thread, Prompt } from './index'
import { TABLE_NAMES, type MessageRoleEnum, type MessageStatusEnum } from '../types'

@Entity({ name: TABLE_NAMES.Message })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'text' })
  role: `${MessageRoleEnum}`

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

  @Column('uuid', { nullable: true })
  parent_message_id?: string
  @ManyToOne(() => Message, (entity) => entity.message)
  @JoinColumn({ name: 'parent_message_id' })
  message?: Message

  @Column('uuid')
  thread_id: string
  @ManyToOne(() => Thread, (entity) => entity.messages)
  @JoinColumn({ name: 'thread_id' })
  thread?: Thread

  @Column('uuid')
  llm_id: string
  @ManyToOne(() => LLM, (entity: LLM) => entity.messages)
  @JoinColumn({ name: 'llm_id' })
  llm?: LLM

  @Column('uuid', { nullable: true })
  prompt_id?: string
  @ManyToOne(() => Prompt, (entity: Prompt) => entity.messages)
  @JoinColumn({ name: 'prompt_id' })
  prompt?: Prompt
}
