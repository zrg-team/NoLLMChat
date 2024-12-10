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

@Entity({ name: TABLE_NAMES.JSONData })
export class JSONData {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  headers: string

  @Column({ type: 'text' })
  json: string

  @Column({ type: 'json', nullable: true })
  data?: unknown

  @Column({ type: 'text', nullable: true })
  metadata?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.json_datas, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
