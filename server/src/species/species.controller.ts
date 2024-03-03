import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access.guard';
import { Roles } from 'src/auth/modules/roles/roles.decorator';
import { Role } from 'src/auth/modules/roles/roles.enum';
import { RolesGuard } from 'src/auth/modules/roles/roles.guard';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  /**
   * Save the new species to the database. Only for admin users.
   *
   * @param createSpeciesDto dto containing species data
   * @returns {Promise<Species>} saved species object
   *
   * @throws {ConflictException} when species with such name already exists in the database
   */
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard)
  @Post()
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  /**
   * Get all species
   * @returns list of all species
   */
  @Get()
  findAll() {
    return this.speciesService.findAll();
  }

  /**
   * Get one species by name. Returns null if nothing found
   * @param name species name
   * @returns one species object or null
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.findOne(id);
  }

  /**
   * Updates an existing species by its ID with the provided data. Only for admin users.
   * @param id The ID of the species to update.
   * @param updateSpeciesDto The data to update the species with.
   * @returns The updated species object.
   *
   * @throws {NotFoundException} if the species with the given ID is not found.
   * @throws {ConflictException} if a species with the updated name already exists.
   */
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpeciesDto: UpdateSpeciesDto,
  ) {
    return this.speciesService.update(id, updateSpeciesDto);
  }

  /**
   * Removes a species by its ID. Only for admin users.
   * @param id The ID of the species to remove.
   * @returns The removed species object.
   *
   * @throws {NotFoundException} if the species with the given ID is not found.
   */
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.remove(id);
  }
}
