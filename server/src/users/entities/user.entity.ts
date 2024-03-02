import { Diagnosis } from 'src/diagnoses/entities/diagnosis.entity';
import { Role } from 'src/roles/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.user)
  diagnoses: Diagnosis[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ enum: Role, default: Role.User })
  role: Role;
}
