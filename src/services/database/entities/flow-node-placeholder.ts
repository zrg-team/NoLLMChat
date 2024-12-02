import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Session } from './index'
import { FlowNodePlaceholderTypeEnum, TABLE_NAMES } from '../types'

@Entity({ name: TABLE_NAMES.FlowNodePlaceholder })
export class FlowNodePlaceholder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', nullable: true })
  placeholder?: string

  @Column({ type: 'text', nullable: true })
  placeholder_type: `${FlowNodePlaceholderTypeEnum}`

  @Column({ type: 'json', nullable: true })
  data?: unknown

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, unknown>

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.flow_nodes, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
