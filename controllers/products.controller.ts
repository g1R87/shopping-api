import { Request, Response } from "express";
import Product from "../models/products.model";

interface ProductObject {
  _id?: String;
  name?: { $regex: String; $options?: String };
  price?: Number;
  featured?: Boolean;
  rating?: Number;
  createdAt?: String;
  company?: String;
  filed?: any;
}

export const getAllProducts = async (req: Request, res: Response) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryObject: ProductObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company as string;
  }
  if (name) {
    queryObject.name = { $regex: name as string, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap: any = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<=": "$lte",
      "<": "$lt",
    };
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters: string | void = (numericFilters as string).replace(
      regEx,
      (match) => {
        return `-${operatorMap[match]}-`;
      }
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field as keyof ProductObject] = {
          [operator]: Number(value),
        };
      }
    });
  }
  console.log(queryObject);
  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = (sort as string).split(",").join(" ");
    result = result.sort(sortList);
  } else result = result.sort("createdAt");

  if (fields) {
    const fieldList = (fields as string).split(",").join(" ");
    result = result.select(fieldList);
  }

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; // this value specifies the page number
  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ nmHits: products.length, products });
};
