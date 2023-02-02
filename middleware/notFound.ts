import { Request, Response } from "express";
const notFound = (req: Request, res: Response) => {
  res.status(404).send("wut??");
};

export default notFound;
