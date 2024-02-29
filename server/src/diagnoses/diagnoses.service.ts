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

  async create(createDiagnosisDto: CreateDiagnosisDto) {
    const { userId, diseaseId } = createDiagnosisDto;
    const user = await this.usersService.findOne(userId);
    if (!user)
      throw new NotFoundException(`user with id=${userId} doesn't exist`);

    const disease = await this.diseaseService.findOne(diseaseId);
    if (!disease)
      throw new NotFoundException(`disease with id=${diseaseId} doesn't exist`);

    const diagnosis = this.diagnosesRepository.create({ user, disease });
    return this.diagnosesRepository.save(diagnosis);
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
