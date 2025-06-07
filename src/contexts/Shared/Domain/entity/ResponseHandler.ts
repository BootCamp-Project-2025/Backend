import { Response } from "express";
import { IResponseEntity } from "../interfaces/IResponseEntity";

export class ResponseHandler {
  public static send(res: Response, response: IResponseEntity): void {
    res.status(response.statusCode).json(response);
  }
}
