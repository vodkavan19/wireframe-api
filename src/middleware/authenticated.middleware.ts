import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import customerModel from '@/resources/customer/customer.model';
import HttpException from '@/utils/exceptions/http.exception';
import Token from '@/utils/interfaces/token.interface';
import token from '@/utils/token';

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const bearer = req.headers.authorization;
  
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(new HttpException(401, 'Unauthorised'));
  }

  const accessToken = bearer.split('Bearer ')[1].trim();
  try {
    const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(accessToken);
    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Unauthorised'));
    };
    
    const customer = await customerModel.findById({ _id: payload.id})
    if (!customer) return next(new HttpException(401, 'Unauthorised'));
    
    return next();
  } catch (error) {
    return next(new HttpException(401, 'Unauthorised'));
  }
}

export default authenticatedMiddleware;
