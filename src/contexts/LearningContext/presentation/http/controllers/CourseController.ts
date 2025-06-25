import { Request, Response } from "express";
import { ICourseController } from "@/contexts/LearningContext/domain/interfaces/ICourseController";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { ICourseService } from "@/contexts/LearningContext/domain/interfaces/ICourseService";
import { inject, injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";

@injectable()
export class CourseController implements ICourseController {
  constructor(
    @inject("ICourseService") private readonly courseService: ICourseService
  ) {}

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

  public getCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      const course = await this.courseService.getCourse(req.params.id);
      const response = new SuccessResponseEntity(course, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in controller getCourse"
      );
    }
  };

  public editCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const dto = req.body as CourseDTO;
      const course = await this.courseService.editCourse(id, dto);
      const response = new SuccessResponseEntity(course, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in controller editCourse"
      );
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.courseService.deleteCourse(req.params.id);
      const response = new SuccessResponseEntity({}, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in controller delete"
      );
    }
  };
}
