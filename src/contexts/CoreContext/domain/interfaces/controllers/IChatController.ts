import { Request, Response } from "express";

export interface IChatController {
  create(req: Request, res: Response): Promise<void>;
}
