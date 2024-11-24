import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Session, Message, LLM, Schema } from './index'
import { TABLE_NAMES, type ThreadStatusEnum } from '../types'

@Entity({ name: TABLE_NAMES.Thread })
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  title: string

  @Column({ type: 'text' })
  status: `${ThreadStatusEnum}`

  @Column({ type: 'text', nullable: true })
  userId?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @OneToMany(() => Message, (entity: Message) => entity.thread, { onDelete: 'CASCADE' })
  messages?: Message[]

  @Column('uuid', { nullable: true })
  schema_id?: string
  @ManyToOne(() => Schema, (entity: Schema) => entity.threads, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'schema_id' })
  schema?: Schema

  @Column('uuid')
  initial_llm_id: string
  @ManyToOne(() => LLM, (entity: LLM) => entity.threads, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'initial_llm_id' })
  llm?: LLM

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.threads, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
