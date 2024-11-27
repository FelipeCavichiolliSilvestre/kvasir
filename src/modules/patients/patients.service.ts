import {
  EditPatientInput,
  GetPatientInput,
  GetPatientOutput,
  iPatientsService,
  ListPatientsInput,
  ListPatientsOutput,
  RegisterPatientInput,
} from './patients.service-interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class PatientsService implements iPatientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerPatient(data: RegisterPatientInput): Promise<number> {
    const { name, birthDate, weightInKg, heightInCm } = data;

    const { id } = await this.prismaService.patient.create({
      data: { name, birthDate, weightInKg, heightInCm },
    });

    return id;
  }

  async listPatients(data: ListPatientsInput): Promise<ListPatientsOutput> {
    const { page, limit, search } = data;

    return this.prismaService.patient.findMany({
      where: search
        ? {
            name: { contains: search },
          }
        : undefined,
      skip: page * limit,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async deletePatient(id: number): Promise<void> {
    await this.prismaService.$transaction([
      this.prismaService.diagnostic.deleteMany({ where: { patientId: id } }),
      this.prismaService.patient.delete({ where: { id } }),
    ]);
  }

  async getPatient(data: GetPatientInput): Promise<GetPatientOutput> {
    const { patientId } = data;

    return this.prismaService.patient.findUnique({
      where: { id: patientId },
      select: {
        id: true,
        name: true,
        birthDate: true,
        weightInKg: true,
        heightInCm: true,
        diagnosis: true,
      },
    });
  }

  async editPatient(data: EditPatientInput): Promise<void> {
    const { patientId, name, birthDate, weightInKg, heightInCm } = data;

    await this.prismaService.patient.update({
      where: { id: patientId },
      data: {
        name,
        birthDate,
        weightInKg,
        heightInCm,
      },
    });
  }
}
