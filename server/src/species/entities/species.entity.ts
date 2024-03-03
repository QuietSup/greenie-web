import { Disease } from 'src/diseases/entities/disease.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Disease, (disease) => disease.species)
  diseases: Disease[];
}
