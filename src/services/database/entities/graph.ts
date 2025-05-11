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

@Entity({ name: TABLE_NAMES.Graph })
export class Graph {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'jsonb', nullable: true })
  config?: Record<string, unknown>

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
