import { Disease } from 'src/diseases/entities/disease.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Diagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.diagnoses)
  user: User;

  @ManyToOne(() => Disease, (disease) => disease.diagnoses)
  disease: Disease;
}
