import { Request, Response } from "express";
import { ICourseController } from "@/contexts/LearningContext/domain/interfaces/ICourseController";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { ICourseService } from "@/contexts/LearningContext/domain/interfaces/ICourseService";
import { inject, injectable } from "tsyringe";
import { IEnrollmentService } from "@/contexts/LearningContext/domain/interfaces/IEnrollmentService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { StatusCodes } from "http-status-codes";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

@injectable()
export class CourseController implements ICourseController {
  constructor(
    @inject("ICourseService") private readonly courseService: ICourseService,
    @inject("IEnrollmentService")
    private readonly enrollmentService: IEnrollmentService
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

  enrollInCourse = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    const courseId = req.params.courseId;
    try {
      await this.enrollmentService.enrollInCourse(courseId, userId);
      const response = new SuccessResponseEntity(
        "Enrollment successful",
        StatusCodes.NO_CONTENT
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Enrollment failed"
      );
    }
  };
}
