import { Inject, Module } from '@nestjs/common';
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
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { databaseConfig } from './config-namespaces/database/database.config';
import { validateDatabaseEnv } from './config-namespaces/database/database-config.validation';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          entities: [User, Diagnosis, Disease, Species],
          synchronize: true,
        };
      },
    }),
    DiseaseClassifierModule,
    DiseasesModule,
    DiagnosesModule,
    SpeciesModule,
    RolesModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      load: [databaseConfig],
      validate: validateDatabaseEnv,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
