import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class iAiService {
  abstract predict(data: PredictInput): Promise<string>;
}

export type PredictInput = {
  imagePath: string;
};
