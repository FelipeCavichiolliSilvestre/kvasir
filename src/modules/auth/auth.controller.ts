import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { LoginDto } from './dtos';
import { iAuthService } from './auth.service.interface';
import { Response } from 'express';
import { FoundException } from '../../shared';
import { Allow } from './guard/allow.decorator';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: iAuthService) {}

  @Get('/login')
  @Render('auth/login')
  @Allow()
  async getLoginForm() {}

  @Post('/login')
  @Render('auth/login')
  @Allow()
  async postLogin(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(body);
    const jwt = await this.authService.createJwt(user);
    response.cookie('jwt', jwt);
    response.setHeader('location', '/');
    throw new FoundException();
  }
}
