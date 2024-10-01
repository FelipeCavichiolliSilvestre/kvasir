import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(this.catchErrorFn));
  }

  catchErrorFn(error: any) {
    if (!(error instanceof HttpException)) {
      console.error(error);

      return of({
        error: true,
        message: 'Internal server error',
        statusCode: 500,
      });
    }

    if (error.getStatus() == 302) throw error;
    if (error.getStatus() == 401) throw error;

    const errorResponse = error.getResponse();
    if (typeof errorResponse == 'string')
      return of({ error: true, message: errorResponse });
    else return of({ error: true, ...errorResponse });
  }
}
