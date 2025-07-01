import { Request, Response } from "express";

export interface IUserController {
  get(req: Request, res: Response): void;
  post(req: Request, res: Response): void;
  freelance(req: Request, res: Response): void;
  getUserProfile(req: Request, res: Response): Promise<void>;
}
