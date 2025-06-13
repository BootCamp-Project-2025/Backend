import { Request, Response } from "express";

export interface ICertificationController {
  getByFreelancerId(req: Request, res: Response): void;
}
