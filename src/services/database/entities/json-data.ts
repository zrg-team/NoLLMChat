import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TABLE_NAMES } from '../types'

@Entity({ name: TABLE_NAMES.JSONData })
export class JSONData {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  json: string

  @Column({ type: 'text', nullable: true })
  metadata?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column('uuid')
  session_id: string
}
