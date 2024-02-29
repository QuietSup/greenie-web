import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { DiseaseClassifierModule } from './disease-classifier/disease-classifier.module';
import { DiseasesModule } from './diseases/diseases.module';
import { DiagnosesModule } from './diagnoses/diagnoses.module';
import { SpeciesModule } from './species/species.module';
import { Diagnosis } from './diagnoses/entities/diagnosis.entity';
import { Disease } from './diseases/entities/disease.entity';
import { Species } from './species/entities/species.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'postgres',
      entities: [User, Diagnosis, Disease, Species],
      synchronize: true,
    }),
    DiseaseClassifierModule,
    DiseasesModule,
    DiagnosesModule,
    SpeciesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
