import { IAddCategory } from "../interfaces/category";
import { CategoryAbstract } from "../repositories/category-abstract";

export class CategoryService {
  private categoryRepository: CategoryAbstract;
  constructor(categoryRepository: CategoryAbstract) {
    this.categoryRepository = categoryRepository;
  }

  getAll() {
    return this.categoryRepository.findAll();
  }

  create(req: IAddCategory) {
    return this.categoryRepository.create(req);
  }
}
