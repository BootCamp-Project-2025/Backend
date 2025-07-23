import { Request, Response } from "express";

export interface IClientController {
  get(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
}
