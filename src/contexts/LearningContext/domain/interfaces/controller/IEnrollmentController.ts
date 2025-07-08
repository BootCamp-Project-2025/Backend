import { Request, Response } from "express";

export interface IEnrollmentController {
  enrollInCourse(req: Request, res: Response): Promise<void>;
}
