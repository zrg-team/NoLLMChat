import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TABLE_NAMES } from '../types'

@Entity({ name: TABLE_NAMES.CSVData })
export class CSVData {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  headers: string

  @Column({ type: 'text' })
  data: string

  @Column({ type: 'text', nullable: true })
  metadata?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column('uuid')
  session_id: string
}
