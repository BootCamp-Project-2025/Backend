import { Request, Response } from "express";

export interface IEnrollmentController {
  createEnrollment(req: Request, res: Response): Promise<void>;
  cancelEnrollment(req: Request, res: Response): Promise<void>;
  getEnrollmentById(req: Request, res: Response): Promise<void>;
  getEnrollmentsByUserId(req: Request, res: Response): Promise<void>;
  getEnrollmentsByCourseId(req: Request, res: Response): Promise<void>;
}
