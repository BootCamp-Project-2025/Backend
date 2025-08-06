import { Request, Response } from "express";

export interface IDashboardController {
  getStudentStats(req: Request, res: Response): Promise<void>;
  getTeacherStats(req: Request, res: Response): Promise<void>;
}
