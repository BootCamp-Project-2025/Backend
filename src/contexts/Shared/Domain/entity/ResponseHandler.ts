import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class ResponseHandler {
  public static sendSuccess<T>(
    res: Response,
    data: T = {} as T,
    message: string = "Success",
    statusCode: StatusCodes = StatusCodes.OK
  ): void {
    res.status(statusCode).json({ success: true, message, data });
  }

  public static sendError(
    res: Response,
    message: string,
    errors: string[] = [],
    statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
  ): void {
    res.status(statusCode).json({ message, errors });
  }
}
