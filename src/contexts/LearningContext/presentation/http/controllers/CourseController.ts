import { Request, Response } from "express";
import { ICourseService } from "@/contexts/LearningContext/domain/interfaces/ICourseService";
import { ICourseController } from "@/contexts/LearningContext/domain/interfaces/ICourseController";

export class CourseController implements ICourseController {
  constructor(private readonly courseService: ICourseService) {}

  public getAllCourses = async (req: Request, res: Response): Promise<void> => {
    try {
      const courses = await this.courseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error in CourseController.getAllCourses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
