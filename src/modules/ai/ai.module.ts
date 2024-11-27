import { Module } from '@nestjs/common';
import { iAiService } from './ai.service-interface';
import { AiMockService } from './ai.mock-service';

@Module({
  providers: [{ provide: iAiService, useClass: AiMockService }],
  exports: [iAiService],
})
export class AiModule {}
