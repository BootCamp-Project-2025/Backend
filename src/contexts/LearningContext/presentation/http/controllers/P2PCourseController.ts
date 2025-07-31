import { FilePostDTO } from "@/contexts/LearningContext/domain/dtos/FilePostDTO";
import { P2PCourseDTO } from "@/contexts/LearningContext/domain/dtos/P2PCourseDTO";
import { PostDTO } from "@/contexts/LearningContext/domain/dtos/PostDTO";
import { SessionDTO } from "@/contexts/LearningContext/domain/dtos/SessionDTO";
import IP2PCourseController from "@/contexts/LearningContext/domain/interfaces/IP2PCourseController";
import IP2PCourseService from "@/contexts/LearningContext/domain/interfaces/IP2PCourseService";
import FilePostMapper from "@/contexts/LearningContext/mappers/FilePostMapper";
import P2PCourseMapper from "@/contexts/LearningContext/mappers/P2PCourseMapper";
import PostMapper from "@/contexts/LearningContext/mappers/PostMapper";
import SessionMapper from "@/contexts/LearningContext/mappers/SessionMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { getUserFromRequest } from "@/contexts/Shared/utils/getUserFromRequest";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class P2PCourseController implements IP2PCourseController {
  constructor(
    @inject("IP2PCourseService") private readonly service: IP2PCourseService
  ) {}

  editSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const sessionDto = req.body as SessionDTO;
      sessionDto.id = req.params.sessionId;
      const p2pCourseId = req.params.p2pCourseId;
      const user = getUserFromRequest(req);
      this.validateEditPermision(p2pCourseId, user.id);
      const session = SessionMapper.dtoToDomain(sessionDto);
      const savedSession = await this.service.editSession(p2pCourseId, session);
      const responseData = SessionMapper.domainToDto(savedSession);
      const response = new SuccessResponseEntity(responseData, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  addSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const sessionDto = req.body as SessionDTO;
      const p2pCourseId = req.params.p2pCourseId;
      const user = getUserFromRequest(req);
      this.validateEditPermision(p2pCourseId, user.id);
      const session = SessionMapper.dtoToDomain(sessionDto);
      const savedSession = await this.service.addSession(p2pCourseId, session);
      const responseData = SessionMapper.domainToDto(savedSession);
      const response = new SuccessResponseEntity(
        responseData,
        StatusCodes.CREATED
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  removeSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const sessionId = req.params.sessionId;
      const p2pCourseId = req.params.p2pCourseId;
      const user = getUserFromRequest(req);
      this.validateEditPermision(p2pCourseId, user.id);
      await this.service.removeSession(p2pCourseId, sessionId);
      const response = new SuccessResponseEntity({}, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  completeSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const sessionId = req.params.sessionId;
      const p2pCourseId = req.params.p2pCourseId;
      const user = getUserFromRequest(req);
      this.validateEditPermision(p2pCourseId, user.id);
      const updatedSession = await this.service.completeSession(
        p2pCourseId,
        sessionId
      );
      const response = new SuccessResponseEntity(
        SessionMapper.domainToDto(updatedSession),
        StatusCodes.OK
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  editPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const postDto = req.body as PostDTO;
      postDto.id = req.params.postId;
      const p2pCourseId = req.params.p2pCourseId;
      const user = getUserFromRequest(req);
      this.validateEditPermision(p2pCourseId, user.id);
      const post = PostMapper.dtoToDomain(postDto);
      const editedPost = await this.service.editPost(p2pCourseId, post);
      const responseData = PostMapper.domainToDto(editedPost);
      const response = new SuccessResponseEntity(responseData, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  addPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const postDto = req.body as PostDTO;
      const p2pCourseId = req.params.p2pCourseId;
      const user = getUserFromRequest(req);
      this.validateEditPermision(p2pCourseId, user.id);
      const post = PostMapper.dtoToDomain(postDto);
      const savedPost = await this.service.addPost(p2pCourseId, post);
      const responseData = PostMapper.domainToDto(savedPost);
      const response = new SuccessResponseEntity(
        responseData,
        StatusCodes.CREATED
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  removePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const postId = req.params.postId;
      const p2pCourseId = req.params.p2pCourseId;
      const user = getUserFromRequest(req);
      this.validateEditPermision(p2pCourseId, user.id);
      await this.service.removePost(p2pCourseId, postId);
      const response = new SuccessResponseEntity({}, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  addFilePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const filePostDto = req.body as FilePostDTO;
      const p2pCourseId = req.params.p2pCourseId;
      const user = getUserFromRequest(req);
      this.validateEditPermision(p2pCourseId, user.id);
      const filePost = FilePostMapper.dtoToDomain(filePostDto);
      const savedPost = await this.service.addFilePost(p2pCourseId, filePost);
      const responseData = FilePostMapper.domainToDto(savedPost);
      const response = new SuccessResponseEntity(
        responseData,
        StatusCodes.CREATED
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  removeFilePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const filePostId = req.params.filePostId;
      const p2pCourseId = req.params.p2pCourseId;
      const user = getUserFromRequest(req);
      this.validateEditPermision(p2pCourseId, user.id);
      await this.service.removeFilePost(p2pCourseId, filePostId);
      const response = new SuccessResponseEntity({}, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const p2pCourseDTO = req.body as P2PCourseDTO;
      const p2pCourse = P2PCourseMapper.dtoToDomain(p2pCourseDTO);
      const savedP2PCourse = await this.service.create(p2pCourse);
      const response = new SuccessResponseEntity(
        P2PCourseMapper.domainToDto(savedP2PCourse),
        StatusCodes.CREATED
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  getByUserIdAndCourseId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const p2pCourseId = req.params.p2pCourseId;
      const user = getUserFromRequest(req);
      const p2pCourse = await this.service.getByUserIdAndCourseId(
        p2pCourseId,
        user.id
      );
      const response = new SuccessResponseEntity(
        P2PCourseMapper.domainToDto(p2pCourse),
        StatusCodes.OK
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError();
      }
    }
  };

  private async validateEditPermision(
    p2pCourseId: string,
    userId: string
  ): Promise<void> {
    if (
      (await this.service.getByUserIdAndCourseId(p2pCourseId, userId))
        .teacherId === userId
    ) {
      return;
    }
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "You dont have permision to change the course"
    );
  }
}
