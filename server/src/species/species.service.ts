import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {}

  create(createSpeciesDto: CreateSpeciesDto) {
    const species = this.speciesRepository.create(createSpeciesDto);
    return this.speciesRepository.save(species);
  }

  findAll() {
    return this.speciesRepository.find();
  }

  findOne(id: number) {
    return this.speciesRepository.findOneBy({ id });
  }

  update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    return `This action updates a #${id} species`;
  }

  async remove(id: number) {
    const species = await this.findOne(id);
    if (!species)
      throw new NotFoundException(`species with id=${id} doesn't exist`);
    return this.speciesRepository.remove(species);
  }
}
