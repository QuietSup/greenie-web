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
      entities: [User],
      synchronize: true,
    }),
    DiseaseClassifierModule,
    DiseasesModule,
    DiagnosesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
