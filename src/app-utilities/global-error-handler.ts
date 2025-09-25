import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  console.error(err);

  return res.status(500).json({ message: "Internal server error" });
};

export default globalErrorHandler;
