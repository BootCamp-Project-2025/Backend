import { Response } from "express";
import { IResponseEntity } from "../../Domain/interfaces/IResponseEntity";

export class ResponseService {
  public static send(res: Response, response: IResponseEntity): void {
    res.status(response.statusCode).json(response);
  }
}
