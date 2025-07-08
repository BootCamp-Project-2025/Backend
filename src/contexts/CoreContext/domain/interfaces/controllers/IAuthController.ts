import { Request, Response } from "express";

export interface IAuthController {
  syncUser(req: Request, res: Response): Promise<void>;
}
