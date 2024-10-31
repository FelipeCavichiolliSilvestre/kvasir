import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';

@Injectable()
export abstract class iPatientsService {
  abstract registerPatient(data: RegisterPatientInput): Promise<number>;
  abstract listPatients(data: ListPatientsInput): Promise<ListPatientsOutput>;
  abstract deletePatient(id: number): Promise<void>;
  abstract getPatient(data: GetPatientInput): Promise<GetPatientOutput>;
  abstract editPatient(data: EditPatientInput): Promise<void>;
}

export type RegisterPatientInput = {
  name: string;
  birthDate: Date;
  weightInKg: number;
  heightInCm: number;
};

export type ListPatientsInput = {
  search?: string;
  page?: number;
  limit?: number;
};

export type ListPatientsOutput = {
  id: number;
  name: string;
}[];

export type GetPatientInput = {
  patientId: number;
};

export type GetPatientOutput = Patient;

export type EditPatientInput = RegisterPatientInput & { patientId: number };
