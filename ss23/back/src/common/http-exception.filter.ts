import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { ErrorResponse } from '../types/api';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let error = 'InternalError';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as any;
      message = (res?.message as string) || exception.message || message;
      error = (res?.error as string) || exception.name || 'HttpException';
    } else if (exception && typeof exception === 'object') {
      const anyEx = exception as any;
      message = anyEx?.message || message;
      error = anyEx?.name || 'Error';
    }

    const body: ErrorResponse = {
      error,
      status,
      message,
    };

    response.status(status).json(body);
  }
}
