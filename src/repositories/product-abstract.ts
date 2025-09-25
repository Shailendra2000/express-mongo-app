import { IProduct } from "../database/models/product";
import { IAddProduct } from "../interfaces/product";

export abstract class ProductAbstract {
  abstract create(item: IAddProduct): Promise<IProduct>;
  abstract findById(id: string | number): Promise<IProduct | null>;
  abstract findAll(): Promise<IProduct[]>;
  abstract update(
    id: string | number,
    item: Partial<IAddProduct>
  ): Promise<IProduct | null>;
  abstract delete(id: string | number): Promise<IProduct | null>;
}
