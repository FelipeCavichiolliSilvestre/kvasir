import { Injectable } from '@nestjs/common';
import { Diagnostic, Patient } from '@prisma/client';

@Injectable()
export abstract class iDiagnosticsService {
  abstract getDiagnosticImagePathInput(
    data: GetDiagnosticImagePathInput,
  ): Promise<string>;
  abstract createDiagnostic(data: CreateDiagnosticInput): Promise<void>;
  abstract deleteDiagnostic(diagnosticId: number): Promise<number>;
  abstract generateDiagnosticReport(
    diagnosticId: number,
  ): Promise<GenerateDiagnosticReportOutput>;
}

export type CreateDiagnosticInput = {
  patientId: number;
  imagePath: string;
};

export type GetDiagnosticImagePathInput = {
  diagnosisId: number;
};

export type GenerateDiagnosticReportOutput = {
  patient: Patient & { bmi: number };
  diagnosis: Diagnostic;
};
