import { IAddProduct } from "../interfaces/product";
import { ProductAbstract } from "../repositories/product-abstract";

export class ProductService {
  private productRepository: ProductAbstract;
  constructor(productRepository: ProductAbstract) {
    this.productRepository = productRepository;
  }

  getAll() {
    return this.productRepository.findAll();
  }

  create(req: IAddProduct) {
    return this.productRepository.create(req);
  }

  update(id: string, updateData: Partial<IAddProduct>) {
    return this.productRepository.update(id, updateData);
  }

  delete(id: string) {
    return this.productRepository.delete(id);
  }
}
