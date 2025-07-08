import { Request, Response } from "express";
import { ICourseController } from "@/contexts/LearningContext/domain/interfaces/ICourseController";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { ICourseService } from "@/contexts/LearningContext/domain/interfaces/ICourseService";
import { inject, injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { ResponseService } from "../../../../Shared/application/services/ResponseService";
import { ErrorResponseEntity } from "../../../../Shared/domain/entity/ErrorResponseEntity";
import { SuccessResponseEntity } from "../../../../Shared/domain/entity/SuccessResponseEntity";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@injectable()
export class CourseController implements ICourseController {
  constructor(
    @inject("ICourseService") private readonly courseService: ICourseService
  ) {}
  getCompleteCourse(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

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

  public publish = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const result = await this.courseService.publish(id);
      res.status(201).json({ published: result });
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accessing the publish service"
      );
    }
  };
}
