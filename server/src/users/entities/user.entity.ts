import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date;
}
