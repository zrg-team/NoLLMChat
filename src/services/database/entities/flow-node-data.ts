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
import { TABLE_NAMES } from '../types'

@Entity({ name: TABLE_NAMES.FlowNodeData })
export class FlowNodeData {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'json', nullable: true })
  data?: Record<string, unknown>

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, unknown>

  @Column({ type: 'json', nullable: true })
  properties?: Record<string, unknown>

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
