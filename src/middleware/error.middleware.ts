import { NextFunction, Request, Response } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = error.status || 500;
  const message = error.message || 'Sorry unable to connect to system'

  if(error.status == 401) {
    res.status(status).send({
      success: true,
      isUserAuthenticated: false,
      content: message
    });
  }

  res.status(status).send({
    success: false,
    content: message
  });
}

export default errorMiddleware;
