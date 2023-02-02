import { NextFunction, Request, Response } from "express";
const errorHandlerMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message);
  return res
    .status(500)
    .json({ msg: "Something went wrong, Please try again!" });
};

export default errorHandlerMiddleware;
