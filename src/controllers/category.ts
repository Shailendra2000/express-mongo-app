import { Request, Response } from "express";
import { CategoryService } from "../services/category";

export class CategoryController {
  private categoryService: CategoryService;
  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  getAll = async (_: Request, res: Response) => {
    const categories = await this.categoryService.getAll();
    return res.status(200).json({ categories });
  };

  create = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const category = await this.categoryService.create({ name, description });
    return res.status(201).json({ category });
  };
}
