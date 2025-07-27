import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Session } from './index'
import { TABLE_NAMES } from '../types'

@Entity({ name: TABLE_NAMES.BasicAgent })
export class BasicAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'text' })
  system_prompt: string

  @Column({ type: 'integer' })
  max_iterations: number

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.schemas, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}
