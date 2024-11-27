import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DiagnosticsController } from './diagnostics.controller';
import { AiModule } from '../ai';
import { iDiagnosticsService } from './diagnostics.service-interface';
import { DiagnosticService } from './diagnostic.service';

@Module({
  imports: [
    MulterModule.register({
      dest: process.env.UPLOAD_PATH,
    }),
    AiModule,
  ],
  providers: [{ provide: iDiagnosticsService, useClass: DiagnosticService }],
  controllers: [DiagnosticsController],
})
export class DiagnosticsModule {}
