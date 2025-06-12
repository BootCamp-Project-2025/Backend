import { StatusCodes } from "http-status-codes";
import { IResponseEntity } from "../interfaces/IResponseEntity";

export interface ISuccessResponseEntity<T> extends IResponseEntity {
  data?: T;
}

export class SuccessResponseEntity<T> implements ISuccessResponseEntity<T> {
  success: boolean = true;
  statusCode: number;
  message: string;
  data?: T;

  constructor(
    data: T,
    statusCode: number = StatusCodes.OK,
    message: string = "Success"
  ) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
  }
}
