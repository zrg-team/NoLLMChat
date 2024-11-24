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
import {
  TABLE_NAMES,
  VectorDatabaseProviderEnum,
  VectorDatabaseStorageEnum,
  VectorDatabaseTypeEnum,
} from '../types'

@Entity({ name: TABLE_NAMES.VectorDatabase })
export class VectorDatabase {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  type: `${VectorDatabaseTypeEnum}`

  @Column({ type: 'text', nullable: true })
  provider?: `${VectorDatabaseProviderEnum}`

  @Column({ type: 'text', nullable: true })
  storage?: `${VectorDatabaseStorageEnum}`

  @Column({ type: 'text', nullable: true })
  metadata?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.vector_databases, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
