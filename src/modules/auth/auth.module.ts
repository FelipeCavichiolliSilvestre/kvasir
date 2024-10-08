import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { iAuthService } from './auth.service.interface';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthGuard, { provide: iAuthService, useClass: AuthService }],
  exports: [AuthGuard],
})
export class AuthModule {}
