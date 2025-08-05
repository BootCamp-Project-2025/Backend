import { Request, Response } from "express";

export interface IProposalController {
  create(req: Request, res: Response): Promise<void>;
  getByChatId(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
}
