import { Document, Schema } from "mongoose";

export default interface Transaction extends Document {
  date: Date;
  desc: string;
  amount: number;
  customerId: Schema.Types.ObjectId;
}