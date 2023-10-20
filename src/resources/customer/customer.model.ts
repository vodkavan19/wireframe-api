import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";
import Customer from './customer.interface';

const CustomerSchema = new Schema({
  customerId: {
    type: String,
    require: true,
    minLength: 8,
    maxLength: 20
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
    maxLength: 20
  },
  name: {
    type: String,
    require: true
  },
  last_login: {
    type: Date,
  },
  balance: {
    type: Number,
    require: true,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true,
})

CustomerSchema.pre<Customer>('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

export default model<Customer>('Customer', CustomerSchema)