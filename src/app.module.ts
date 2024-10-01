import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma';
import { AuthModule } from './modules/auth';

@Module({
  imports: [PrismaModule, AuthModule],
})
export class AppModule {}
