import { Request, Response } from "express";

export interface IMessageController {
  create(req: Request, res: Response): Promise<void>;
  getMessagesByChatId(req: Request, res: Response): Promise<void>;
  updateMessageStatus(req: Request, res: Response): Promise<void>;
}
