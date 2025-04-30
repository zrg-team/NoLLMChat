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
import { EmbeddingProviderEnum, TABLE_NAMES } from '../types'

@Entity({ name: TABLE_NAMES.Embedding })
export class Embedding {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  key: string

  @Column({ type: 'text', nullable: true })
  provider?: `${EmbeddingProviderEnum}`

  @Column({ type: 'json', nullable: true })
  data?: Record<string, unknown>

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, unknown>

  @Column({ type: 'json', nullable: true })
  encrypted?: Record<string, unknown>

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
