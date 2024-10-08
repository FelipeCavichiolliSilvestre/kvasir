import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma';
import { AuthModule } from './modules/auth';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule],
})
export class AppModule {}
