import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Message, Thread } from './entry'
import { LLMStatusEnum } from '../types/llm'

@Entity({ name: 'llms' })
export class LLM {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  status: `${LLMStatusEnum}`

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @OneToMany(() => Message, (message) => message.thread)
  messages?: Message[]

  @OneToMany(() => Thread, (thread) => thread.llm)
  threads?: Thread[]
}
