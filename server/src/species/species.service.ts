import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   * Save the new species to the database
   *
   * @param createSpeciesDto dto containing species data
   * @returns {Promise<Species>} saved species object
   *
   * @throws {ConflictException} when species with such name already exists in the database
   */
  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const species = await this.speciesRepository.existsBy({
      name: createSpeciesDto.name,
    });
    if (!species) throw new ConflictException('species already exists');

    return this.speciesRepository.save(createSpeciesDto);
  }

  /**
   * Get all species data from the database
   * @returns a list of all species
   */
  findAll(): Promise<Species[]> {
    return this.speciesRepository.find();
  }

  /**
   * Get one species by id. Returns null if nothing found
   * @param id species id
   * @returns one species object or null
   */
  findOne(id: number): Promise<Species> {
    return this.speciesRepository.findOneBy({ id });
  }

  /**
   * Get one species by name. Returns null if nothing found
   * @param name species name
   * @returns one species object or null
   */
  findOneByName(name: string): Promise<Species> {
    return this.speciesRepository.findOneBy({ name });
  }

  /**
   * Updates an existing species by its ID with the provided data.
   * @param id The ID of the species to update.
   * @param updateSpeciesDto The data to update the species with.
   * @returns The updated species object.
   *
   * @throws {NotFoundException} if the species with the given ID is not found.
   * @throws {ConflictException} if a species with the updated name already exists.
   */
  async update(
    id: number,
    updateSpeciesDto: UpdateSpeciesDto,
  ): Promise<Species> {
    const species = await this.findOne(id);
    if (!species) throw new NotFoundException('species not found');

    const alreadyExists = await this.speciesRepository.existsBy({
      name: updateSpeciesDto.name,
    });
    if (alreadyExists)
      throw new ConflictException('species with such name already exists');

    species.name = updateSpeciesDto.name;
    return this.speciesRepository.save(species);
  }

  /**
   * Removes a species by its ID.
   * @param id The ID of the species to remove.
   * @returns The removed species object.
   *
   * @throws {NotFoundException} if the species with the given ID is not found.
   */
  async remove(id: number): Promise<Species> {
    const species = await this.findOne(id);
    if (!species)
      throw new NotFoundException(`species with id=${id} doesn't exist`);
    return this.speciesRepository.remove(species);
  }
}
