import bcrypt from 'bcrypt';
import HttpException from '@/utils/exceptions/http.exception';
import tokenUtil from '@/utils/token';
import transactionModel from '../transaction/transaction.model';
import Customer from './customer.interface';
import customerModel from './customer.model';

class CustomerService {
  private customerModal = customerModel;
  private transactionModal = transactionModel;

  public async login(id: string, password: string): Promise<object | Error> { 
    const customer = await this.customerModal.findOne({ customerId: id }) as Customer
    if (!customer) throw new HttpException(401 ,'Invalid User Credentials');

    const validPassword = bcrypt.compareSync(password, customer.password);  
    if (!validPassword) throw new HttpException(401 ,'Invalid User Credentials');
    
    const token = await tokenUtil.genarateToken(customer); 
    
    await this.customerModal.findByIdAndUpdate(customer.id, {
      last_login: new Date()
    })

    return {
      success: true,
      isUserAuthenticated: true,
      customerid: customer.customerId,
      token,
    };
  }

  public async getDetail(customerid: string): Promise<object | Error> {    
    const detail = await this.customerModal.aggregate([
      {
        $match: { customerId: customerid }
      },
      {
        $lookup: {
          from: 'transactions',
          foreignField: 'customerId',
          localField: '_id',
          as: 'transaction'
        }
      },
      {
        $project: {
          customerId: 1,
          name: 1,
          last_login: 1,
          balance: 1,
          "transaction.createdAt": 1,
          "transaction.desc": 1,
          "transaction.amount": 1
        }
      },
    ])
    
    return detail;
  }
}

export default CustomerService;
