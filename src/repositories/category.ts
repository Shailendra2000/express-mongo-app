import Category, { ICategory } from "../database/models/category";
import { IAddCategory } from "../interfaces/category";
import { CategoryAbstract } from "./category-abstract";

export class CategoryRepository extends CategoryAbstract {
  async create(item: IAddCategory): Promise<ICategory> {
    return Category.create(item);
  }

  async findById(id: string): Promise<ICategory | null> {
    return Category.findById(id).exec();
  }

  async findAll(): Promise<ICategory[]> {
    return Category.find().sort({ updatedAt: -1 }).exec();
  }
}
