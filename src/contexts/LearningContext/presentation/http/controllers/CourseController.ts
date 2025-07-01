import { Request, Response } from "express";
import { ICourseController } from "@/contexts/LearningContext/domain/interfaces/ICourseController";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { ICourseService } from "@/contexts/LearningContext/domain/interfaces/ICourseService";
import { inject, injectable } from "tsyringe";

@injectable()
export class CourseController implements ICourseController {
  constructor(
    @inject("ICourseService") private readonly courseService: ICourseService
  ) { }

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
    } catch (error) {
      console.error("Error in CourseController.create:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  /**
   * PUT /courses/:id
   */
  public updateCourse = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const dto = req.body as CourseDTO;
      // if your service method is called `update`, rename accordingly:
      const updated = await this.courseService.updateCourse(id, dto);
      return res.status(200).json(updated);
    } catch (error) {
      console.error("Error in CourseController.updateCourse:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  /**
   * DELETE /courses/:id
   */
  public deleteCourse = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await this.courseService.deleteCourse(id);
      // 204: No Content
      return res.sendStatus(204);
    } catch (error) {
      console.error("Error in CourseController.deleteCourse:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
