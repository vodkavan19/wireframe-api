import { Document } from "mongoose";

export default interface Customer extends Document {
  customerId: string;
  password: string;
  name: string;
  last_login: Date;
  balance: string;
}