import { StatusCodes } from "http-status-codes";
import { IResponseEntity } from "../interfaces/IResponseEntity";

export interface IErrorResponseEntity extends IResponseEntity {
  errors: string[];
}

export class ErrorResponseEntity implements IErrorResponseEntity {
  success: boolean = false;
  statusCode: number;
  message: string;
  errors: string[];

  constructor(
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = "Internal server error",
    errors: string[] = []
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}
