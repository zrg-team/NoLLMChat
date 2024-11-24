import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Session } from './index'
import { TABLE_NAMES, type ToolDefinitionTypeEnum } from '../types'

@Entity({ name: TABLE_NAMES.ToolDefinition })
export class ToolDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'text', nullable: true })
  type?: `${ToolDefinitionTypeEnum}`

  @Column({ type: 'text', nullable: true })
  metadata?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.tool_definitions, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
