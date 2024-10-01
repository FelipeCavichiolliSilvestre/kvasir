import { ForbiddenException, Injectable } from '@nestjs/common';
import { iAuthService, JwtPayload, LoginInput } from './auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma';
import { User } from './user.entity';
import { UserNotFoundError } from './errors';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements iAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginInput): Promise<User> {
    const { username, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (user === null) throw new UserNotFoundError();

    if (await bcrypt.compare(password, user.passwordHash)) {
      return user;
    } else {
      throw new ForbiddenException();
    }
  }

  async createJwt(user: User): Promise<string> {
    const { id, username } = user;

    return this.jwtService.sign({
      userId: id,
      username,
    } as JwtPayload);
  }

  async validateJwt(jwt: string): Promise<JwtPayload | false> {
    try {
      const payload = this.jwtService.verify(jwt);
      if (!payload) {
        return false;
      }

      return payload;
    } catch (error) {
      return false;
    }
  }
}
