import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      if(Object.keys(req.body).length !== 0) {
        const validate = await schema.validateAsync(req.body, validationOptions);
        req.body = validate;
      }
      if(Object.keys(req.query).length !== 0) {
        const validate = await schema.validateAsync(req.query, validationOptions);
        req.query = validate;
      }
      next();
    } catch (e: any) {
      const errors: string[] = [];
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message);
      });
      res.status(400).send({ errors: errors });
    }
  };
}

export default validationMiddleware;
