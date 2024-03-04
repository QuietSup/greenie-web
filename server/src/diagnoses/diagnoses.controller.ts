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
import { DiagnosesService } from './diagnoses.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access.guard';
import { RequestUser } from 'src/users/entities/request-user.entity';
import { User } from 'src/auth/decorators/user.decorator';
import { RolesGuard } from 'src/auth/modules/roles/roles.guard';
import { Roles } from 'src/auth/modules/roles/roles.decorator';
import { Role } from 'src/auth/modules/roles/roles.enum';

@Controller('diagnoses')
export class DiagnosesController {
  constructor(private readonly diagnosesService: DiagnosesService) {}

  /**
   * Retrieves all diagnoses associated with the current user.
   *
   * @param {RequestUser} reqUser - The authenticated user object.
   * @returns {Promise<Diagnosis[]>} An array of diagnoses associated with the user.
   */
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @UseGuards(JwtAccessAuthGuard)
  @Get('me')
  findAllByUser(@User() reqUser: RequestUser) {
    return this.diagnosesService.findByUser(reqUser.userId);
  }

  /**
   * Creates a new diagnosis for the current user.
   *
   * @param {RequestUser} reqUser - The authenticated user object.
   * @param {CreateDiagnosisDto} createDiagnosisDto - The DTO containing the details of the diagnosis to be created.
   * @returns {Promise<Diagnosis>} The newly created diagnosis.
   */
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @UseGuards(JwtAccessAuthGuard)
  @Post()
  create(
    @User() reqUser: RequestUser,
    @Body() createDiagnosisDto: CreateDiagnosisDto,
  ) {
    console.log(createDiagnosisDto);
    return this.diagnosesService.create(reqUser.userId, createDiagnosisDto);
  }

  @Get()
  findAll() {
    return this.diagnosesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnosesService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @UseGuards(JwtAccessAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiagnosisDto: UpdateDiagnosisDto,
  ) {
    return this.diagnosesService.update(+id, updateDiagnosisDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @UseGuards(JwtAccessAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosesService.remove(+id);
  }
}
