import { Request, Response } from "express";
import { ICourseController } from "@/contexts/LearningContext/domain/interfaces/ICourseController";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { ICourseService } from "@/contexts/LearningContext/domain/interfaces/ICourseService";
import { inject, injectable } from "tsyringe";
import { ErrorResponseEntity } from "../../../../Shared/domain/entity/ErrorResponseEntity";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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
  ) {}

  public getAllCourses = async (req: Request, res: Response): Promise<void> => {
    try {
      const courses = await this.courseService.getAllCourses();
      const response = new SuccessResponseEntity(courses, StatusCodes.OK);
      return ResponseService.send(res, response);
    } catch (error) {
      console.error("Error in CourseController.getAllCourses:", error);
      const response = new ErrorResponseEntity(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
      return ResponseService.send(res, response);
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = req.body as CourseDTO;
      const result = await this.courseService.create(dto);
      const response = new SuccessResponseEntity(result, StatusCodes.CREATED);
      return ResponseService.send(res, response);
    } catch (e) {
      const error = e as PrismaClientKnownRequestError;
      console.error("Error in CourseController.create:", error);
      let message = "";
      if (
        error.code === "P2002" &&
        (error.meta?.target as string[])?.includes("name")
      ) {
        message = " That course name already exists, please chose another.";
      }
      const response = new ErrorResponseEntity(
        StatusCodes.INTERNAL_SERVER_ERROR,
        message
      );
      console.log(response);
      return ResponseService.send(res, response);
    }
  };

  public updateCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const dto = req.body as CourseDTO;
      const updated = await this.courseService.updateCourse(id, dto);
      const response = new SuccessResponseEntity(updated, StatusCodes.OK);
      return ResponseService.send(res, response);
    } catch (error) {
      console.error("Error in CourseController.updateCourse:", error);
      const response = new ErrorResponseEntity(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
      return ResponseService.send(res, response);
    }
  };

  public deleteCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.courseService.deleteCourse(id);
      const response = new SuccessResponseEntity(StatusCodes.NO_CONTENT);
      return ResponseService.send(res, response);
    } catch (error) {
      console.error("Error in CourseController.deleteCourse:", error);
      const response = new ErrorResponseEntity(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
      return ResponseService.send(res, response);
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
      console.error("Error in CourseController.enrollInCourse:", error);
      if (error instanceof ApiError) {
        const response = new ErrorResponseEntity(
          error.statusCode,
          error.message
        );
        return ResponseService.send(res, response);
      }
      const response = new ErrorResponseEntity(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
      return ResponseService.send(res, response);
    }
  };
}
