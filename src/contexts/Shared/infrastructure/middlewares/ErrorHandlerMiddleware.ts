import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";
import { ErrorResponseEntity } from "../../Domain/entity/ErrorResponseEntity";
import { ResponseService } from "../../application/services/ResponseService";

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
