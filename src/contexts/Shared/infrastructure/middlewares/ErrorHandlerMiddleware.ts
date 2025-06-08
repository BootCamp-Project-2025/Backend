import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";
import { ErrorResponseEntity } from "../../Domain/entity/ErrorResponseEntity";
import { ResponseService } from "../services/ResponseService";

export class ErrorHandlerMiddleware {
  public static handle(
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(err);
    const response = new ErrorResponseEntity(
      err.statusCode || 500,
      err.message,
      err.errors || []
    );
    ResponseService.send(res, response);
  }
}
