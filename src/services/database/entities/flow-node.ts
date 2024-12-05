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
  node_type: `${FlowNodeTypeEnum}`

  @Column({ type: 'text', nullable: true })
  source_id: string

  @Column({ type: 'text', nullable: true })
  source_type: `${AppEntityNames}`

  @Column({ type: 'float' })
  x?: number

  @Column({ type: 'float' })
  y?: number

  @Column({ type: 'float', nullable: true })
  width?: number

  @Column({ type: 'float', nullable: true })
  height?: number

  @Column({ type: 'json', nullable: true })
  data?: unknown

  @Column({ type: 'json', nullable: true })
  metadata?: unknown

  @Column({ type: 'text', nullable: true })
  raw?: string

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
