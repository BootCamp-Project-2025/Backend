import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { StatusCodes } from "http-status-codes";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import ILessonController from "@/contexts/LearningContext/domain/interfaces/ILessonController";
import { LessonDTO } from "@/contexts/LearningContext/domain/dtos/LessonDTO";
import ILessonService from "@/contexts/LearningContext/domain/interfaces/ILessonService";
import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import LessonMapper from "@/contexts/LearningContext/mappers/LessonMapper";

@injectable()
export default class LessonController implements ILessonController {
  constructor(
    @inject("ILessonService") private readonly lessonService: ILessonService
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const lessonDto: LessonDTO = req.body as LessonDTO;
      const lesson: Lesson = LessonMapper.DtoToDomain(lessonDto);
      const lessonDomain: Lesson = await this.lessonService.create(
        lesson,
        req.params.moduleId
      );
      const resposeData = LessonMapper.DomainToDto(lessonDomain);
      const response = new SuccessResponseEntity(
        resposeData,
        StatusCodes.CREATED,
        "Lesson saved successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the service"
      );
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const moduleId: string = req.params.lessonId;
      await this.lessonService.delete(moduleId);
      const response = new SuccessResponseEntity(
        {},
        StatusCodes.OK,
        "Lesson deleted successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the service"
      );
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const lessonDto: LessonDTO = req.body as LessonDTO;
      lessonDto.id = req.params.lessonId;
      const lesson: Lesson = LessonMapper.DtoToDomain(lessonDto);
      const lessonDomain: Lesson = await this.lessonService.update(lesson);
      const resposeData = LessonMapper.DomainToDto(lessonDomain);
      const response = new SuccessResponseEntity(
        resposeData,
        StatusCodes.OK,
        "Lesson updated successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the service"
      );
    }
  };
}
