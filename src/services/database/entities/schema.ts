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

import { SchemaItem, Session, Thread } from './index'
import { TABLE_NAMES } from '../types'

@Entity({ name: TABLE_NAMES.Schema })
export class Schema {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @OneToMany(() => SchemaItem, (entity: SchemaItem) => entity.schema, { onDelete: 'CASCADE' })
  schema_items?: SchemaItem[]

  @OneToMany(() => Thread, (entity: Thread) => entity.schema)
  threads?: Thread[]

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.schemas, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
