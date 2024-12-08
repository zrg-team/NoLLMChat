import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import {
  FlowEdge,
  FlowNode,
  LLM,
  Prompt,
  Schema,
  Thread,
  CSVData,
  VectorDatabase,
  JSONData,
  JSONLData,
  ToolDefinition,
} from './index'
import { AppEntityNames, SessionTypeEnum, TABLE_NAMES, type SessionStatusEnum } from '../types'

@Entity({ name: TABLE_NAMES.Session })
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  status: `${SessionStatusEnum}`

  @Column({ type: 'text', default: SessionTypeEnum.Whiteboard })
  type: `${SessionTypeEnum}`

  @Column({ type: 'text', nullable: true })
  metadata?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column({ type: 'text', nullable: true })
  main_node_id?: string

  @Column({ type: 'text', nullable: true })
  main_source_id?: string

  @Column({ type: 'text', nullable: true })
  main_source_type?: `${AppEntityNames}`

  @OneToMany(() => Prompt, (entity: Prompt) => entity.session, { onDelete: 'CASCADE' })
  prompts?: Prompt[]

  @OneToMany(() => Thread, (entity: Thread) => entity.session, { onDelete: 'CASCADE' })
  threads?: Thread[]

  @OneToMany(() => LLM, (entity: LLM) => entity.session, { onDelete: 'CASCADE' })
  llms?: LLM[]

  @OneToMany(() => FlowNode, (entity: FlowNode) => entity.session, { onDelete: 'CASCADE' })
  flow_nodes?: FlowNode[]

  @OneToMany(() => FlowEdge, (entity: FlowEdge) => entity.session, { onDelete: 'CASCADE' })
  flow_edges?: FlowEdge[]

  @OneToMany(() => Schema, (entity: Schema) => entity.session, { onDelete: 'CASCADE' })
  schemas?: Schema[]

  @OneToMany(() => CSVData, (entity: CSVData) => entity.session, { onDelete: 'CASCADE' })
  csv_datas?: CSVData[]

  @OneToMany(() => VectorDatabase, (entity: VectorDatabase) => entity.session, {
    onDelete: 'CASCADE',
  })
  vector_databases?: VectorDatabase[]

  @OneToMany(() => JSONData, (entity: JSONData) => entity.session, { onDelete: 'CASCADE' })
  json_datas?: JSONData[]

  @OneToMany(() => JSONLData, (entity: JSONLData) => entity.session, { onDelete: 'CASCADE' })
  jsonl_datas?: JSONLData[]

  @OneToMany(() => ToolDefinition, (entity: ToolDefinition) => entity.session, {
    onDelete: 'CASCADE',
  })
  tool_definitions?: ToolDefinition[]
}
