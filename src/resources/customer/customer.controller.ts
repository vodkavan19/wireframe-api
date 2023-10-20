import { NextFunction, Request, Response, Router } from 'express';
import authenticatedMiddleware from '@/middleware/authenticated.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import CustomerService from './customer.service';
import validator from './customer.validator'

class CustomerController implements Controller {
  public path = '/customers';
  public router = Router();
  private customerService = new CustomerService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validator.login),
      this.login,
    );
    this.router.get(
      `${this.path}/detail`, 
      authenticatedMiddleware,
      validationMiddleware(validator.detail),
      this.getDetail
    );
  }

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { client_id, user } = req.body;
      const { id, password } = user;
      
      const result = await this.customerService.login(id, password);

      res.status(200).json(result);
    } catch (error: any) {
      next(new HttpException(error.status, error.message));
    }
  };

  private getDetail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { customerid } = req.body; 

    const result = await this.customerService.getDetail(customerid)

    res.status(200).send(result);
  };
}

export default CustomerController;
