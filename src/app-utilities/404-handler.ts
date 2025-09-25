import { Request, Response, NextFunction } from "express";

const notFoundHandler = (_: Request, res: Response, __: NextFunction) => {
  res.status(404).json({ message: "Route not Found!" });
};

export default notFoundHandler;
