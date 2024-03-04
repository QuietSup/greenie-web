import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { RolesGuard } from 'src/auth/modules/roles/roles.guard';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access.guard';
import { Roles } from 'src/auth/modules/roles/roles.decorator';
import { Role } from 'src/auth/modules/roles/roles.enum';

@Controller('diseases')
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard)
  @Post()
  create(@Body() createDiseaseDto: CreateDiseaseDto) {
    return this.diseasesService.create(createDiseaseDto);
  }

  @Get()
  findAll() {
    return this.diseasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diseasesService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiseaseDto: UpdateDiseaseDto) {
    return this.diseasesService.update(+id, updateDiseaseDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diseasesService.remove(+id);
  }
}
