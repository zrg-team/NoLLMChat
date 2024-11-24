import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Schema, Session } from './index'
import { SchemaTypeEnum, TABLE_NAMES } from '../types'

@Entity({ name: TABLE_NAMES.SchemaItem })
export class SchemaItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'boolean' })
  required: boolean

  @Column({ type: 'text' })
  type: `${SchemaTypeEnum}`

  @Column({ type: 'text', nullable: true })
  metadata?: string

  @Column({ type: 'text', nullable: true })
  enum?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @OneToMany(() => SchemaItem, (message: SchemaItem) => message.parent)
  schemas?: SchemaItem[]

  @Column('uuid', { nullable: true })
  parent_id?: string
  @ManyToOne(() => SchemaItem, (entity: SchemaItem) => entity.schemas, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: SchemaItem

  @Column('uuid')
  schema_id: string
  @ManyToOne(() => Schema, (entity: Schema) => entity.schema_items, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'schema_id' })
  schema?: Schema

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.schemas, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
