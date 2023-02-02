import { Router } from "express";
import productRouter from "./products.router";

const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.send(
    '<h1> store api </h1><a href = "/api/v1/products">products route</a>'
  );
});
mainRouter.use("/products", productRouter);
export default mainRouter;
