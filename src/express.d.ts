import { JwtPayload } from './modules/auth/auth.service.interface';

declare global {
  namespace Express {
    interface Request {
      jwtPayload?: JwtPayload;
    }
  }
}
