import "dotenv/config";
import mongoose from "mongoose";

import Product from "../models/products.model";

import connectDB from "../db/connect";
import jsonProduct from "./products.json";

const uri = process.env.MONGO_URI as string;
console.log(uri);

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await connectDB(uri);
    await Product.deleteMany();
    await Product.create(jsonProduct);
    console.log("success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
