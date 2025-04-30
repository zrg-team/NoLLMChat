import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm'
import { LLM, Session } from './index'
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

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>

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
  @OneToOne(() => Message, (entity) => entity.message, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'parent_message_id' })
  message?: Message

  @Column('uuid')
  llm_id: string
  @ManyToOne(() => LLM, (entity: LLM) => entity.messages, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'llm_id' })
  llm?: LLM

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.messages, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
