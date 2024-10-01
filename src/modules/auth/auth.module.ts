import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { iAuthService } from './auth.service.interface';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'aaa',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthGuard, { provide: iAuthService, useClass: AuthService }],
  exports: [AuthGuard],
})
export class AuthModule {}
