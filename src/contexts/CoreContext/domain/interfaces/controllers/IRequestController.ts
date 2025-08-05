import { Request, Response } from "express";

export default interface IRequestController {
  create(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
  getUserActiveRequest(req: Request, res: Response): Promise<void>;
  search(req: Request, res: Response): Promise<void>;
}
