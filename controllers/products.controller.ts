import { Request, Response } from "express";
import Product from "../models/products.model";

interface ProductObject {
  _id?: String;
  name?: String;
  price?: Number;
  featured?: Boolean;
  rating?: Number;
  createdAt?: String;
  company?: String;
  __v?: Number;
}

export const getAllProductsStatic = async (req: Request, res: Response) => {
  const products = await Product.find({ featured: true, name: "vase table" });
  res.status(200).json({ nbHits: products.length, products });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const { featured } = req.query;

  const queryObject: ProductObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  const products = await Product.find(queryObject);
  res.status(200).json({ nmHits: products.length, products });
};
