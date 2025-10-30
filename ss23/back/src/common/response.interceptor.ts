import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { APIResponse } from '../types/api';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, APIResponse<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<APIResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        status: 200,
        message: 'OK',
      })),
    );
  }
}
