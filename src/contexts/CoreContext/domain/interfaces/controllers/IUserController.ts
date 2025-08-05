import { Request, Response } from "express";

export interface IUserController {
  get(req: Request, res: Response): void;
  getChats(req: Request, res: Response): Promise<void>;
  post(req: Request, res: Response): void;
  freelance(req: Request, res: Response): void;
  updateUser(req: Request, res: Response): Promise<void>;
  getCourses(req: Request, res: Response): Promise<void>;
}
