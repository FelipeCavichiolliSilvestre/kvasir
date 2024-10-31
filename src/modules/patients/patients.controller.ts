import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { RegisterPatientsDto } from './dtos';
import { iPatientsService } from './patients.service-interface';
import { Response } from 'express';
import { FoundException, IdParamDto } from '../../shared';
import { ListPatientsDto } from './dtos/list-patient.dto';

@Controller('/patients')
export class PatientsController {
  constructor(private readonly patientsService: iPatientsService) {}

  @Get('/list')
  @Render('patients/list')
  async getPatientsList(@Query() query: ListPatientsDto) {
    const { search, page, limit } = query;

    const patients = await this.patientsService.listPatients({
      search,
      page,
      limit,
    });

    return {
      search,
      patients,
      isEmpty: patients.length === 0,
    };
  }

  @Get('/register')
  @Render('patients/register')
  async getRegisterPatientForm() {}

  @Post('/register')
  @Render('patients/register')
  async registerPatient(
    @Body() body: RegisterPatientsDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { name, birthDate, heightInCm, weightInKg } = body;

    const patientId = await this.patientsService.registerPatient({
      name,
      birthDate,
      heightInCm,
      weightInKg,
    });

    response.setHeader('location', `/patients/${patientId}/view`);
    throw new FoundException();
  }

  @Get('/:id/view')
  @Render('patients/view')
  async getPatientView(@Param() params: IdParamDto) {
    const { id } = params;

    const patient = await this.patientsService.getPatient({ patientId: id });

    return {
      patient: {
        ...patient,
        formattedBirthDate: patient.birthDate.toLocaleDateString('pt-BR'),
      },
    };
  }

  @Get('/:id/edit')
  @Render('patients/edit')
  async getEditPatientForm(@Param() params: IdParamDto) {
    const { id } = params;

    const patient = await this.patientsService.getPatient({ patientId: id });
    console.log(patient.birthDate.toISOString().split('T')[0]);
    return {
      patient: {
        ...patient,
        birthDate: patient.birthDate.toISOString().split('T')[0],
      },
    };
  }

  @Post('/:id/edit')
  @Render('patients/edit')
  async editPatient(
    @Param() params: IdParamDto,
    @Body() body: RegisterPatientsDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id } = params;
    const { name, birthDate, weightInKg, heightInCm } = body;

    await this.patientsService.editPatient({
      patientId: id,
      name,
      birthDate,
      weightInKg,
      heightInCm,
    });

    response.setHeader('location', `/patients/${id}/view`);
    throw new FoundException();
  }

  @Get('/:id/delete')
  @Render('patients/delete')
  async getDeletePatientForm(@Param() params: IdParamDto) {
    const { id } = params;

    const patient = await this.patientsService.getPatient({ patientId: id });
    return {
      patient: {
        id: patient.id,
        name: patient.name,
      },
    };
  }

  @Post('/:id/delete')
  @Render('patients/delete')
  async deletePatient(
    @Param() params: IdParamDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id } = params;

    await this.patientsService.deletePatient(id);

    response.setHeader('location', `/patients/list`);
    throw new FoundException();
  }
}
