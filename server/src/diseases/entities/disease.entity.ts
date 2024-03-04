import { Diagnosis } from 'src/diagnoses/entities/diagnosis.entity';
import { Species } from 'src/species/entities/species.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Disease {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  tfCode: number;

  @ManyToOne(() => Species, (species) => species.diseases)
  species: Species;

  @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.disease)
  diagnoses: Diagnosis[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
