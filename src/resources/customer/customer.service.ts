import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import HttpException from '@/utils/exceptions/http.exception';
import tokenUtil from '@/utils/token';
import Transaction from '../transaction/transaction.interface';
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
    ])
    
    return {
      success: true,
      customer: {
        id: detail[0].customerId,
        name: detail[0].name,
        last_login: detail[0].last_login,
        balance: detail[0].balance,
        transaction: detail[0].transaction.map((item: { createdAt: any; desc: any; amount: any; }) => {
          return {
            date: item.createdAt,
            desc: item.desc,
            amount: item.amount
          }
        })
      }
    };
  }
}

export default CustomerService;
