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

@Entity({ name: TABLE_NAMES.FlowEdge })
export class FlowEdge {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, type: 'text' })
  type?: string

  @Column({ type: 'text' })
  source: string

  @Column({ type: 'text' })
  target: string

  @Column({ nullable: true, type: 'text' })
  sourceHandle?: string | null

  @Column({ nullable: true, type: 'text' })
  targetHandle?: string | null

  @Column({ default: false, type: 'boolean' })
  animated?: boolean

  @Column({ default: false, type: 'boolean' })
  hidden?: boolean

  @Column({ default: true, type: 'boolean' })
  deletable?: boolean

  @Column({ default: true, type: 'boolean' })
  selectable?: boolean

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.flow_edges, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
