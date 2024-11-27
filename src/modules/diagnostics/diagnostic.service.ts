import { Injectable } from '@nestjs/common';
import {
  CreateDiagnosticInput,
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
