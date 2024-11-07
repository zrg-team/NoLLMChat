import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { FlowEdge, FlowNode, LLM, Prompt, Thread } from './index'
import { TABLE_NAMES, type SessionStatusEnum } from '../types'

@Entity({ name: TABLE_NAMES.Session })
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  status: `${SessionStatusEnum}`

  @Column({ type: 'text', nullable: true })
  metadata?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @OneToMany(() => Prompt, (entity: Prompt) => entity.session)
  prompts?: Prompt[]

  @OneToMany(() => Thread, (entity: Thread) => entity.session)
  threads?: Thread[]

  @OneToMany(() => LLM, (entity: LLM) => entity.session)
  llms?: LLM[]

  @OneToMany(() => FlowNode, (entity: FlowNode) => entity.session)
  flow_nodes?: FlowNode[]

  @OneToMany(() => FlowEdge, (entity: FlowEdge) => entity.session)
  flow_edges?: FlowEdge[]
}
