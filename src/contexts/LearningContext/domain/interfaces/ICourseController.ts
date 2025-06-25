// erase rule once used
import { Request, Response } from "express";

export interface ICourseController {
  getAllCourses(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<Response>;
  getCourse(req: Request, res: Response): Promise<void>;
  editCourse(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}
