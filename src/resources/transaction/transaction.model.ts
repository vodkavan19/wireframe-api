import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";
import Transaction from './transaction.interface';

const TransactionSchema = new Schema({
  date: {
    type: Date,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  }, 
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
}, {
  timestamps: true,
})

export default model<Transaction>('Transaction', TransactionSchema)