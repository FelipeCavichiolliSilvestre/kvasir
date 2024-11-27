import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoundException, IdParamDto } from '../../shared';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { iPatientsService } from '../patients/patients.service-interface';
import { iDiagnosticsService } from './diagnostics.service-interface';
import { createReadStream } from 'fs';

@Controller('/')
export class DiagnosticsController {
  constructor(private readonly diagnosticsService: iDiagnosticsService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post('/patients/:id/diagnostics/create')
  async createDiagnostics(
    @Param() params: IdParamDto,
    @UploadedFile() image: Express.Multer.File,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id: patientId } = params;
    const imagePath = image.path;

    await this.diagnosticsService.createDiagnostic({
      patientId,
      imagePath,
    });

    response.setHeader('location', `/patients/${patientId}/view`);
    throw new FoundException();
  }

  @Get('/diagnostics/:id/image')
  async getDiagnosticImage(
    @Param() params: IdParamDto,
  ): Promise<StreamableFile> {
    const { id: diagnosisId } = params;

    const path = await this.diagnosticsService.getDiagnosticImagePathInput({
      diagnosisId,
    });

    const file = createReadStream(path);
    return new StreamableFile(file);
  }

  @Get('/diagnostics/:id/delete')
  async removeDiagnostic(
    @Param() params: IdParamDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id: diagnosticId } = params;

    const patientId =
      await this.diagnosticsService.deleteDiagnostic(diagnosticId);

    response.setHeader('location', `/patients/${patientId}/view`);
    throw new FoundException();
  }
}
