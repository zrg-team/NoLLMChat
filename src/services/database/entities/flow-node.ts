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
import { AppEntityNames, FlowNodeTypeEnum, TABLE_NAMES } from '../types'

@Entity({ name: TABLE_NAMES.FlowNode })
export class FlowNode {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  source_id: string

  @Column({ type: 'text' })
  source_type: `${AppEntityNames}`

  @Column({ type: 'text' })
  node_type: `${FlowNodeTypeEnum}`

  @Column({ type: 'int' })
  x?: number

  @Column({ type: 'int' })
  y?: number

  @Column({ type: 'int', nullable: true })
  width?: number

  @Column({ type: 'int', nullable: true })
  height?: number

  @Column({ type: 'json', nullable: true })
  json?: Record<string, unknown>

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.flow_nodes)
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
