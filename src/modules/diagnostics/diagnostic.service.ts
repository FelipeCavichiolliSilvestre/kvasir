import { Injectable } from '@nestjs/common';
import {
  CreateDiagnosticInput,
  GenerateDiagnosticReportOutput,
  GetDiagnosticImagePathInput,
  iDiagnosticsService,
} from './diagnostics.service-interface';
import { PrismaService } from '../prisma';
import { iAiService } from '../ai';

@Injectable()
export class DiagnosticService implements iDiagnosticsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aiService: iAiService,
  ) {}

  async generateDiagnosticReport(
    diagnosticId: number,
  ): Promise<GenerateDiagnosticReportOutput> {
    const { patient, ...diagnosis } =
      await this.prismaService.diagnostic.findUnique({
        where: { id: diagnosticId },
        include: {
          patient: true,
        },
      });

    return {
      patient: {
        ...patient,
        bmi: patient.weightInKg / Math.pow(patient.heightInCm / 100, 2),
      },
      diagnosis,
    };
  }

  async deleteDiagnostic(diagnosticId: number): Promise<number> {
    const { patientId } = await this.prismaService.diagnostic.delete({
      where: { id: diagnosticId },
    });

    return patientId;
  }

  async getDiagnosticImagePathInput(
    data: GetDiagnosticImagePathInput,
  ): Promise<string> {
    const { diagnosisId } = data;

    const { image } = await this.prismaService.diagnostic.findUnique({
      where: { id: diagnosisId },
      select: { image: true },
    });

    return image;
  }

  async createDiagnostic(data: CreateDiagnosticInput): Promise<void> {
    const { patientId, imagePath } = data;

    const diagnosis = await this.aiService.predict({ imagePath });

    await this.prismaService.diagnostic.create({
      data: {
        patientId,
        image: imagePath,
        result: diagnosis,
      },
    });
  }
}
