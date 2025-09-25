import Product, { IProduct } from "../database/models/product";
import { IAddProduct } from "../interfaces/product";
import { ProductAbstract } from "./product-abstract";

export class ProductRepository extends ProductAbstract {
  async create(item: IAddProduct): Promise<IProduct> {
    return Product.create(item);
  }

  async findById(id: string): Promise<IProduct | null> {
    return Product.findById(id).populate("category").exec();
  }

  async findAll(): Promise<IProduct[]> {
    return Product.find().sort({ updatedAt: -1 }).populate("category").exec();
  }

  async update(
    id: string,
    item: Partial<IAddProduct>
  ): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<IProduct | null> {
    return Product.findByIdAndDelete(id).exec();
  }
}
