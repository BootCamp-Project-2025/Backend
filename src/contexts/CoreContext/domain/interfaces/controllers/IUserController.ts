import { Request, Response } from "express";

export interface IUserController {
  getUser(req: Request, res: Response): void;
  post(req: Request, res: Response): void;
}
