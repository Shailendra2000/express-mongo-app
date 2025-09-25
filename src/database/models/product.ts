import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./category";

export interface IProduct extends Document {
  name: string;
  description?: string;
  category: ICategory["_id"];
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
