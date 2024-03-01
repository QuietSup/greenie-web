import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { Repository } from 'typeorm';
import { Diagnosis } from './entities/diagnosis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { DiseasesService } from 'src/diseases/diseases.service';

@Injectable()
export class DiagnosesService {
  constructor(
    @InjectRepository(Diagnosis)
    private readonly diagnosesRepository: Repository<Diagnosis>,

    private readonly usersService: UsersService,
    private readonly diseaseService: DiseasesService,
  ) {}

  /**
   * Creates a new diagnosis for the specified user with the provided details.
   *
   * @param {number} userId - The ID of the user for whom the diagnosis is being created.
   * @param {CreateDiagnosisDto} createDiagnosisDto - The DTO containing the details of the diagnosis to be created.
   * @returns {Promise<Diagnosis>} The newly created diagnosis.
   * @throws {NotFoundException} If the user or the disease specified in the DTO is not found.
   */
  async create(userId: number, createDiagnosisDto: CreateDiagnosisDto) {
    const { diseaseId } = createDiagnosisDto;
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException(`user doesn't exist`);

    const disease = await this.diseaseService.findOne(diseaseId);
    if (!disease)
      throw new NotFoundException(`disease with id=${diseaseId} doesn't exist`);

    return this.diagnosesRepository.save({ user, disease });
  }

  /**
   * Finds diagnoses associated with the specified user along with related diseases and species.
   *
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Diagnosis[]>} An array of diagnoses with associated diseases and species.
   * @throws {NotFoundException} If the user is not found.
   */
  async findByUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('user not found');

    const diagnosesWithDiseasesWithSpecies =
      await this.diagnosesRepository.find({
        where: { user: user },
        relations: {
          disease: {
            species: true,
          },
        },
      });

    return diagnosesWithDiseasesWithSpecies;
  }

  findAll() {
    return this.diagnosesRepository.find();
  }

  findOne(id: number) {
    return this.diagnosesRepository.findOneBy({ id });
  }

  update(id: number, updateDiagnosisDto: UpdateDiagnosisDto) {
    return `This action updates a #${id} diagnosis`;
  }

  async remove(id: number) {
    const diagnosis = await this.findOne(id);
    if (!diagnosis)
      throw new NotFoundException(`diagnosis with id=${id} doesn't exist`);

    return this.diagnosesRepository.remove(diagnosis);
  }
}
