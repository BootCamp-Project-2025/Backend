/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { CreateCourseService } from "../../application/services/CreateCourseService";

export class CourseController {
  constructor(private readonly createCourseService: CreateCourseService) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.createCourseService.execute(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
