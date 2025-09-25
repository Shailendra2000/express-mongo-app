import { Router } from "express";
import { ProductController } from "../controllers/product";
import { ProductRepository } from "../repositories/product";
import { ProductService } from "../services/product";
import {
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} from "../request-validators/product";
import { asyncErrorHandler } from "../app-utilities/async-error-handler";
import { authenticate } from "../app-utilities/authenticate";

const productRoute = Router();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);
productRoute.get("/", asyncErrorHandler(productController.getAll));
productRoute.post(
  "/",
  authenticate,
  createProductValidator,
  asyncErrorHandler(productController.create)
);
productRoute.put(
  "/:id",
  authenticate,
  updateProductValidator,
  asyncErrorHandler(productController.update)
);
productRoute.delete(
  "/:id",
  authenticate,
  deleteProductValidator,
  asyncErrorHandler(productController.delete)
);

export default productRoute;
