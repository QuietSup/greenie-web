import { Module } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { DiseasesController } from './diseases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disease } from './entities/disease.entity';
import { Species } from 'src/species/entities/species.entity';

@Module({
  imports: [DiseasesModule, TypeOrmModule.forFeature([Disease, Species])],
  controllers: [DiseasesController],
  providers: [DiseasesService],
  exports: [DiseasesService],
})
export class DiseasesModule {}
