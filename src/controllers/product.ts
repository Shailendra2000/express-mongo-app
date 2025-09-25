import { Request, Response } from "express";
import { ProductService } from "../services/product";

export class ProductController {
  private productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
  }

  getAll = async (_: Request, res: Response) => {
    const products = await this.productService.getAll();
    return res.status(200).json({ products });
  };

  create = async (req: Request, res: Response) => {
    const { name, description, price, category } = req.body;

    const product = await this.productService.create({
      name,
      description,
      price,
      category,
    });
    return res.status(201).json({ product });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const updatedProduct = await this.productService.update(id, {
      name,
      description,
      price,
      category,
    });

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({ product: updatedProduct });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleted = await this.productService.delete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({ message: "Product deleted successfully" });
  };
}
