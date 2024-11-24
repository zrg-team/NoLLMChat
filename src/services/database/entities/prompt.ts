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
import { Message, PromptVariable, Session } from './index'
import { MessageRoleEnum, TABLE_NAMES, type PromptStatusEnum, type PromptTypeEnum } from '../types'

@Entity({ name: TABLE_NAMES.Prompt })
export class Prompt {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', nullable: true })
  prefix?: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'text', nullable: true })
  suffix?: string

  @Column({ type: 'text' })
  type: `${PromptTypeEnum}`

  @Column({ type: 'text' })
  role: `${MessageRoleEnum}`

  @Column({ type: 'text' })
  status: `${PromptStatusEnum}`

  @Column({ type: 'text', nullable: true })
  metadata?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @OneToMany(() => Message, (message: Message) => message.prompt)
  messages?: Message[]

  @OneToMany(() => PromptVariable, (variable: PromptVariable) => variable.prompt, {
    onDelete: 'CASCADE',
  })
  variables?: PromptVariable[]

  @Column('uuid')
  session_id: string
  @ManyToOne(() => Session, (entity: Session) => entity.prompts, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session
}
