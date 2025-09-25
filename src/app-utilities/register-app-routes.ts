import { Express } from "express";
import productRoute from "../routes/product.route";
import categoryRoute from "../routes/category.route";
import authRoute from "../routes/auth.route";
import { authenticate } from "./authenticate";

const registerAppRoutes = (app: Express) => {
  console.log("registering app routes...");

  app.get("/health", (_, res) => {
    res.status(200).json({ message: "Welcome to Task Api!" });
  });

  app.use("/product", productRoute);
  app.use("/category", authenticate, categoryRoute);
  app.use("/auth", authRoute);
};

export default registerAppRoutes;
