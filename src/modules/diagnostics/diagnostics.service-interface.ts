import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class iDiagnosticsService {
  abstract getDiagnosticImagePathInput(
    data: GetDiagnosticImagePathInput,
  ): Promise<string>;
  abstract createDiagnostic(data: CreateDiagnosticInput): Promise<void>;
  abstract deleteDiagnostic(diagnosticId: number): Promise<number>;
}

export type CreateDiagnosticInput = {
  patientId: number;
  imagePath: string;
};

export type GetDiagnosticImagePathInput = {
  diagnosisId: number;
};
