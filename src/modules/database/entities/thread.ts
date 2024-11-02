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
import { Message } from './entry'
import { ThreadStatusEnum } from '../types/thread'
import { LLM } from './llm'

@Entity({ name: 'threads' })
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

  @OneToMany(() => Message, (message) => message.thread)
  messages?: Message[]

  @Column('uuid')
  initial_llm_id: string
  @ManyToOne(() => LLM, (llm) => llm.threads)
  @JoinColumn({ name: 'initial_llm_id' })
  llm?: LLM
}
