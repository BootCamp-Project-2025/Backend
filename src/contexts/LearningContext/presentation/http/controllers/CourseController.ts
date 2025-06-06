/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { CourseService } from "../../../infrastructure/services/CourseService";
import { ICourseController } from "@/contexts/LearningContext/domain/interfaces/ICourseController";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";

export class CourseController implements ICourseController {
  constructor(private readonly courseService: CourseService) {}

  public getAllCourses = async (req: Request, res: Response): Promise<void> => {
    try {
      const courses = await this.courseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error in CourseController.getAllCourses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dto = req.body as CourseDTO;
      const result = await this.courseService.create(dto);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}
