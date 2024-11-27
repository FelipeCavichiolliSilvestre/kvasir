import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma';
import { AuthModule } from './modules/auth';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './modules/patients';
import { DiagnosticsModule } from './modules/diagnostics';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    PatientsModule,
    DiagnosticsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
