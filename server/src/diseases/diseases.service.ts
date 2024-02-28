import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { Repository } from 'typeorm';
import { Disease } from './entities/disease.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiseasesService {
  constructor(
    @InjectRepository(Disease)
    private readonly diseasesRepository: Repository<Disease>,
  ) {}

  create(createDiseaseDto: CreateDiseaseDto): Promise<Disease> {
    const disease = this.diseasesRepository.create(createDiseaseDto);
    if (this.findOneByTfCode(disease.tfCode)) {
      throw new ConflictException('disease with this tf code already exists');
    }
    return this.diseasesRepository.save(disease);
  }

  findAll(): Promise<Disease[]> {
    return this.diseasesRepository.find();
  }

  findOne(id: number): Promise<Disease> {
    return this.diseasesRepository.findOneBy({ id });
  }

  findOneByTfCode(tfCode: number): Promise<Disease> {
    return this.diseasesRepository.findOneBy({ tfCode });
  }

  async update(
    id: number,
    updateDiseaseDto: UpdateDiseaseDto,
  ): Promise<Disease> {
    const disease = await this.findOne(id);
    if (!disease) {
      throw new NotFoundException("disease with such id doesn't exist");
    }
    disease.name = updateDiseaseDto.name;
    disease.tfCode = updateDiseaseDto.tfCode;

    return this.diseasesRepository.save(disease);
  }

  async remove(id: number): Promise<boolean> {
    const rowsDeleted = (await this.diseasesRepository.delete(id)).affected;
    if (rowsDeleted == 0) {
      throw new NotFoundException("disease can't be deleted");
    }
    return true;
  }
}
