import { NextFunction, Request, Response } from "express";
import { ResponseService } from "../../application/services/ResponseService";
import { ErrorResponseEntity } from "../../domain/entity/ErrorResponseEntity";
import { ApiError } from "../errors/ApiError";

export class ErrorHandlerMiddleware {
  public static handle(
    err: ApiError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
