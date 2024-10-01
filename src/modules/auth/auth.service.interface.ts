import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class iAuthService {
  abstract login(data: LoginInput): Promise<User>;
  abstract createJwt(user: User): Promise<string>;
  abstract validateJwt(jwt: string): Promise<JwtPayload | false>;
}

export type LoginInput = {
  username: string;
  password: string;
};

export type JwtPayload = {
  userId: number;
  username: string;
};
