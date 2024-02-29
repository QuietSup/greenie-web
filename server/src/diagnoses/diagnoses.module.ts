import { Module } from '@nestjs/common';
import { DiagnosesService } from './diagnoses.service';
import { DiagnosesController } from './diagnoses.controller';
import { UsersService } from 'src/users/users.service';
import { DiseasesService } from 'src/diseases/diseases.service';
import { DiseasesModule } from 'src/diseases/diseases.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosis } from './entities/diagnosis.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [UsersModule, DiseasesModule, TypeOrmModule.forFeature([Diagnosis])],
  controllers: [DiagnosesController],
  providers: [DiagnosesService],
  exports: [DiagnosesService],
})
export class DiagnosesModule {}
