import { Request, Response } from "express";

export interface IChatController {
  create(req: Request, res: Response): Promise<void>;
  get(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
}
