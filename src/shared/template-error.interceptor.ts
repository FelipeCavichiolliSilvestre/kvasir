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
    function catchErrorFn(error: any) {
      if (!(error instanceof HttpException)) {
        return of({
          error: true,
          message: 'Internal server error',
          statusCode: 500,
        });
      }

      const errorResponse = error.getResponse();
      const response =
        typeof errorResponse == 'string'
          ? { message: errorResponse }
          : errorResponse;
      return of({ error: true, ...response });
    }

    return next.handle().pipe(catchError(catchErrorFn));
  }
}
