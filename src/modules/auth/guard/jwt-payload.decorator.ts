import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';

export const JwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const payload = request.jwtPayload;

    if (!payload)
      throw new Error(
        `Should not use ${JwtPayload.name} without ${AuthGuard.name}`,
      );

    return payload;
  },
);
