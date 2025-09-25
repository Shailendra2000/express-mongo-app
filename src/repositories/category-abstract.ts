import { ICategory } from "../database/models/category";
import { IAddCategory } from "../interfaces/category";

export abstract class CategoryAbstract {
  abstract create(item: IAddCategory): Promise<ICategory>;
  abstract findById(id: string | number): Promise<ICategory | null>;
  abstract findAll(): Promise<ICategory[]>;
}
