import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { iPatientsService } from './patients.service-interface';

@Module({
  controllers: [PatientsController],
  providers: [{ provide: iPatientsService, useClass: PatientsService }],
})
export class PatientsModule {}
