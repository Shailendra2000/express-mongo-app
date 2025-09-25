import { Router } from "express";
import { CategoryRepository } from "../repositories/category";
import { CategoryService } from "../services/category";
import { CategoryController } from "../controllers/category";
import { addCategoryValidator } from "../request-validators/category";
import { asyncErrorHandler } from "../app-utilities/async-error-handler";

const categoryRoute = Router();
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);
categoryRoute.get("/", asyncErrorHandler(categoryController.getAll));
categoryRoute.post(
  "/",
  addCategoryValidator,
  asyncErrorHandler(categoryController.create)
);

export default categoryRoute;
