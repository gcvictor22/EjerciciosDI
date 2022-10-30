import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from "express";

@Catch(HttpException)
export class GeneralExeptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const message = exception.getResponse();
    const stack = exception.stack

    resp.status(status).json(
      {
        statusCode: status,
        timeStamp: new Date().toISOString(),
        path: req.url,
        exceptionMessage: message,
        stackException: stack
      }
    )
  }
}
