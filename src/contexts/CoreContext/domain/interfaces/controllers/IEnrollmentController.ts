import { Request, Response } from "express";

export interface IEnrollmentController {
  createEnrollment(req: Request, res: Response): Promise<void>;
  cancelEnrollment(req: Request, res: Response): Promise<void>;
  checkEnrollment(req: Request, res: Response): Promise<void>;
}
