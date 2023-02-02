import { Router } from "express";
import * as productController from "../controllers/products.controller";
const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/static", productController.getAllProductsStatic);

export default productRouter;
