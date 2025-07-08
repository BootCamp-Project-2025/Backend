// erase rule once used
import { Request, Response } from "express";

export interface ICourseController {
  getAllCourses(req: Request, res: Response): Promise<void>;
  getCompleteCourse(req: Request, res: Response): Promise<void>;
  publish(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  updateCourse(req: Request, res: Response): Promise<void>;
  deleteCourse(req: Request, res: Response): Promise<void>;
}
