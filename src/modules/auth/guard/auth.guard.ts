import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { iAuthService } from '../auth.service.interface';
import { Request, Response } from 'express';
import { FoundException } from '../../../shared';
import { AllowDecorator } from './allow.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: iAuthService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allow = this.reflector.get(AllowDecorator, context.getHandler());
    if (allow === true) return true;

    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const jwt = request.cookies.jwt;
    if (jwt == undefined) return this.redirect(response);

    const payload = await this.authService.validateJwt(jwt);
    if (payload === false) return this.redirect(response);

    request.jwtPayload = payload;
    return true;
  }

  redirect(response: Response) {
    response.setHeader('location', '/login');
    throw new FoundException();
    // noinspection UnreachableCodeJS
    return false;
  }
}
