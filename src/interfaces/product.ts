import { ICategory } from "../database/models/category";

export interface IAddProduct {
  name: string;
  description: string;
  category: ICategory["_id"];
  price: number;
}
