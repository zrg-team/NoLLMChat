import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import {
  LLM,
  Prompt,
  Schema,
  VectorDatabase,
  SchemaItem,
  Message,
  PromptVariable,
  Embedding,
  Mcp,
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
  data?: string

  @Column({ type: 'text', nullable: true })
  main_source_id?: string

  @Column({ type: 'text', nullable: true })
  main_source_type?: `${AppEntityNames}`

  @Column({ type: 'text', nullable: true })
  passphrase?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @OneToMany(() => Prompt, (entity: Prompt) => entity.session, { onDelete: 'CASCADE' })
  prompts?: Prompt[]

  @OneToMany(() => PromptVariable, (entity: PromptVariable) => entity.session, {
    onDelete: 'CASCADE',
  })
  prompt_variables?: PromptVariable[]

  @OneToMany(() => Message, (entity: Message) => entity.session, {
    onDelete: 'CASCADE',
  })
  messages?: Message[]

  @OneToMany(() => LLM, (entity: LLM) => entity.session, { onDelete: 'CASCADE' })
  llms?: LLM[]

  @OneToMany(() => Schema, (entity: Schema) => entity.session, { onDelete: 'CASCADE' })
  schemas?: Schema[]

  @OneToMany(() => SchemaItem, (entity: SchemaItem) => entity.session, {
    onDelete: 'CASCADE',
  })
  schema_items?: SchemaItem[]

  @OneToMany(() => VectorDatabase, (entity: VectorDatabase) => entity.session, {
    onDelete: 'CASCADE',
  })
  vector_databases?: VectorDatabase[]

  @OneToMany(() => Embedding, (entity: Embedding) => entity.session, {
    onDelete: 'CASCADE',
  })
  embeddings?: Embedding[]

  @OneToMany(() => Session, (entity: Mcp) => entity.session, {
    onDelete: 'CASCADE',
  })
  mcps?: Mcp[]
}
