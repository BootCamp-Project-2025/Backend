import { NextFunction, Request, Response } from "express";

export class ErrorHandlerMiddleware {
  public static handle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(err);

    res.status(err.statusCode || 500).json({ message: err.message });
  }
}
