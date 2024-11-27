import { iAiService } from './ai.service-interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiMockService implements iAiService {
  private labels = [
    'dyed-lifted-polyps',
    'dyed-resection-margins',
    'esophagitis',
    'normal-cecum',
    'normal-pylorus',
    'normal-z-line',
    'polyps',
    'ulcerative-colitis',
  ];

  async predict(): Promise<string> {
    const randomLabelIndex = Math.floor(Math.random() * this.labels.length);

    return this.labels[randomLabelIndex];
  }
}
