import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
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
}
