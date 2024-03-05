import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { Equal, Repository } from 'typeorm';
import { Disease } from './entities/disease.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from 'src/species/entities/species.entity';

@Injectable()
export class DiseasesService {
  constructor(
    @InjectRepository(Disease)
    private readonly diseasesRepository: Repository<Disease>,

    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {}

  /**
   * Creates a new disease.
   * @throws ConflictException if a disease with the same TF code
   * or name and species already exists.
   * or species with such id doesn't exist
   * @param createDiseaseDto The data to create the disease.
   * @returns The created disease object.
   */
  async create(createDiseaseDto: CreateDiseaseDto): Promise<Disease> {
    const disease = this.diseasesRepository.create(createDiseaseDto);
    disease.species = this.speciesRepository.create({
      id: createDiseaseDto.speciesId,
    });

    const species = await this.speciesRepository.findOneBy({
      id: createDiseaseDto.speciesId,
    });
    if (!species) throw new NotFoundException("species doesn't exist");
    disease.species = species;

    const tfCodeExists = await this.diseasesRepository.existsBy({
      tfCode: disease.tfCode,
    });
    if (tfCodeExists)
      throw new ConflictException('disease with this tf code already exists');

    // within each species disease names must be unique
    const nameAndSpeciesIdExists = await this.diseasesRepository.exists({
      where: {
        tfCode: disease.tfCode,
        species: { id: disease.species.id },
      },
    });
    if (nameAndSpeciesIdExists)
      throw new ConflictException(
        'disease with such name and species already exists',
      );

    return this.diseasesRepository.save(disease);
  }

  /**
   * Retrieves all diseases.
   * @returns An array of disease objects
   */
  findAll(): Promise<Disease[]> {
    return this.diseasesRepository.find();
  }

  /**
   * Retrieves a disease by its ID.
   * @param id The ID of the disease to retrieve.
   * @returns The disease object or null if not found
   */
  findOne(id: number): Promise<Disease> {
    return this.diseasesRepository.findOneBy({ id });
  }

  /**
   * Retrieves a disease by its TF code.
   * @param tfCode The TF code of the disease to retrieve.
   * @returns The disease object or null if not found.
   */
  findOneByTfCode(tfCode: number): Promise<Disease> {
    return this.diseasesRepository.findOneBy({ tfCode });
  }

  /**
   * Updates an existing disease.
   * or if within each species, disease names must be unique and a disease with the same name already exists.
   * @param id The ID of the disease to update.
   * @param updateDiseaseDto The data to update the disease with.
   * @returns The updated disease object.
   *
   * @throws {NotFoundException} if the disease with the given ID is not found.
   * @throws {ConflictException} if a disease with the same TF code already exists,
   */
  async update(
    id: number,
    { name, speciesId, tfCode }: UpdateDiseaseDto,
  ): Promise<Disease> {
    const disease = await this.findOne(id);
    if (!disease)
      throw new NotFoundException("disease with such id doesn't exist");

    let species: Species | undefined;
    if (speciesId) {
      species = await this.speciesRepository.findOneBy({
        id: speciesId,
      });
      if (!species) throw new NotFoundException("species doesn't exist");
    }

    if (tfCode) {
      const tfCodeExists = await this.diseasesRepository.existsBy({
        tfCode: tfCode,
      });
      if (tfCodeExists)
        throw new ConflictException('disease with this tf code already exists');
    }

    // disease names must be unique within each species
    if (tfCode && speciesId) {
      const nameAndSpeciesIdExists = await this.diseasesRepository.exists({
        where: {
          tfCode: tfCode,
          species: { id: species.id },
        },
      });
      if (nameAndSpeciesIdExists)
        throw new ConflictException(
          'disease with such combination of name and species already exists',
        );
    }

    disease.name = name ?? disease.name;
    disease.tfCode = tfCode ?? disease.tfCode;
    disease.species = species ?? disease.species;

    return this.diseasesRepository.save(disease);
  }

  /**
   * Removes a disease by its ID.
   * @param id The ID of the disease to remove.
   * @returns The removed disease object.
   *
   * @throws {NotFoundException} if the disease with the given ID is not found.
   */
  async remove(id: number): Promise<Disease> {
    const disease = await this.findOne(id);
    if (!disease) throw new NotFoundException("disease doesn't exist");

    return this.diseasesRepository.remove(disease);
  }
}
