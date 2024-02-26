import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  public updated_at: Date;
}
