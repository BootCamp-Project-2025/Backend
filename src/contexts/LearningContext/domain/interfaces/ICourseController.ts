// erase rule once used
import { Request, Response } from "express";

export interface ICourseController {
  getAllCourses(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<Response>;
}
