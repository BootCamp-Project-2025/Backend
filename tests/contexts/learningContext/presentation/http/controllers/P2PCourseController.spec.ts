import "reflect-metadata";
import { P2PCourseController } from "@/contexts/LearningContext/presentation/http/controllers/P2PCourseController";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { Request, Response } from "express";
import IP2PCourseController from "@/contexts/LearningContext/domain/interfaces/IP2PCourseController";
import { SessionDTO } from "@/contexts/LearningContext/domain/dtos/SessionDTO";
import SessionMapper from "@/contexts/LearningContext/mappers/SessionMapper";
import { PostDTO } from "@/contexts/LearningContext/domain/dtos/PostDTO";
import PostMapper from "@/contexts/LearningContext/mappers/PostMapper";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import LiveSession from "@/contexts/LearningContext/domain/entities/LiveSession";
import { FilePostDTO } from "@/contexts/LearningContext/domain/dtos/FilePostDTO";
import FilePostMapper from "@/contexts/LearningContext/mappers/FilePostMapper";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import { P2PCourseDTO } from "@/contexts/LearningContext/domain/dtos/P2PCourseDTO";
import P2PCourseMapper from "@/contexts/LearningContext/mappers/P2PCourseMapper";

jest.mock("@/contexts/Shared/application/services/ResponseService");

describe("P2PCourseController.spec", () => {
  let req: Request;
  let res: Response;
  let controller: IP2PCourseController;
  const serviceMock = {
    create: jest.fn(),
    addSession: jest.fn(),
    removeSession: jest.fn(),
    editSession: jest.fn(),
    completeSession: jest.fn(),
    addPost: jest.fn(),
    removePost: jest.fn(),
    editPost: jest.fn(),
    addFilePost: jest.fn(),
    removeFilePost: jest.fn(),
    getByUserIdAndCourseId: jest.fn(),
  };
  beforeEach(() => {
    req = {
      user: {
        id: "testTeacherId",
        name: "Test User",
        email: "test@example.com",
      },
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    controller = new P2PCourseController(serviceMock);

    jest.clearAllMocks();

    serviceMock.getByUserIdAndCourseId.mockResolvedValue(
      P2PCourse.createFromPrimitive({
        studentId: "test-studentId",
        teacherId: "testTeacherId",
        chatId: "chatIdTest",
        name: "CourseTest",
        remainingSession: 5,
        status: "ACTIVE",
        posts: [],
        files: [],
        sessions: [],
      })
    );
  });

  it("Creates correctly", () => {
    expect(controller).toBeInstanceOf(P2PCourseController);
  });

  it("Calls editSession correctly", async () => {
    req.params = { sessionId: "sessionTestId", p2pCourseId: "p2pCourseTestId" };
    const sessionDto: SessionDTO = {
      id: "sessionTestId",
      url: "https://www.youtube.com/",
      dateOfTheSession: new Date(),
      creationDate: new Date(),
      status: "PENDING",
    };
    req.body = sessionDto;
    const sessionDomain = SessionMapper.dtoToDomain(sessionDto);
    serviceMock.editSession.mockResolvedValue(sessionDomain);
    await controller.editSession(req, res);
    expect(serviceMock.editSession).toHaveBeenCalledWith(
      "p2pCourseTestId",
      sessionDomain
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("Calls addSession correctly", async () => {
    req.params = { p2pCourseId: "p2pCourseTestId" };
    const sessionDto: SessionDTO = {
      id: "testId", //id is put here to track throught the test
      url: "https://www.youtube.com/",
      dateOfTheSession: new Date(),
      creationDate: new Date(),
      status: "PENDING",
    };
    req.body = sessionDto;
    const sessionDomain = SessionMapper.dtoToDomain(sessionDto);
    serviceMock.addSession.mockResolvedValue(sessionDomain);
    await controller.addSession(req, res);
    expect(serviceMock.addSession).toHaveBeenCalledWith(
      "p2pCourseTestId",
      sessionDomain
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("Calls removeSession correctly", async () => {
    req.params = { p2pCourseId: "p2pCourseTestId", sessionId: "sessionTestId" };
    serviceMock.removeSession.mockResolvedValue(undefined);
    await controller.removeSession(req, res);
    expect(serviceMock.removeSession).toHaveBeenCalledWith(
      "p2pCourseTestId",
      "sessionTestId"
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("Calls completeSession correctly", async () => {
    req.params = { p2pCourseId: "p2pCourseTestId", sessionId: "sessionTestId" };
    const domainSession = LiveSession.createFromPrimitive(
      {
        url: "https://www.youtube.com/",
        dateOfTheSession: new Date(),
        creationDate: new Date(),
        status: "COMPLETED",
      },
      "testId"
    );
    serviceMock.completeSession.mockResolvedValue(domainSession);
    await controller.completeSession(req, res);
    expect(serviceMock.completeSession).toHaveBeenCalledWith(
      "p2pCourseTestId",
      "sessionTestId"
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("Calls editPost correctly", async () => {
    req.params = { postId: "postTestId", p2pCourseId: "p2pCourseTestId" };
    const postDto: PostDTO = {
      id: "postTestId",
      url: "https://www.youtube.com/",
      description: "testDescription",
      creationDate: new Date(),
      title: "testTitle",
    };
    req.body = postDto;
    const postDomain = PostMapper.dtoToDomain(postDto);
    serviceMock.editPost.mockResolvedValue(postDomain);
    await controller.editPost(req, res);
    expect(serviceMock.editPost).toHaveBeenCalledWith(
      "p2pCourseTestId",
      postDomain
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("Calls addPost correctly", async () => {
    req.params = { postId: "postTestId", p2pCourseId: "p2pCourseTestId" };
    const postDto: PostDTO = {
      id: "postTestId", //id is put here to track throught the test
      url: "https://www.youtube.com/",
      description: "testDescription",
      creationDate: new Date(),
      title: "testTitle",
    };
    req.body = postDto;
    const postDomain = PostMapper.dtoToDomain(postDto);
    serviceMock.addPost.mockResolvedValue(postDomain);
    await controller.addPost(req, res);
    expect(serviceMock.addPost).toHaveBeenCalledWith(
      "p2pCourseTestId",
      postDomain
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("Calls removePost correctly", async () => {
    req.params = { postId: "postTestId", p2pCourseId: "p2pCourseTestId" };
    serviceMock.removePost.mockResolvedValue(undefined);
    await controller.removePost(req, res);
    expect(serviceMock.removePost).toHaveBeenCalledWith(
      "p2pCourseTestId",
      "postTestId"
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("Calls addFielPost correctly", async () => {
    req.params = { p2pCourseId: "p2pCourseTestId" };
    const filePostDto: FilePostDTO = {
      id: "postTestId", //id is put here to track throught the test
      url: "https://www.youtube.com/",
      creationDate: new Date(),
    };
    req.body = filePostDto;
    const filePostDomain = FilePostMapper.dtoToDomain(filePostDto);
    serviceMock.addFilePost.mockResolvedValue(filePostDomain);
    await controller.addFilePost(req, res);
    expect(serviceMock.addFilePost).toHaveBeenCalledWith(
      "p2pCourseTestId",
      filePostDomain
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("Calls removeFilePost correctly", async () => {
    req.params = { filePostId: "postTestId", p2pCourseId: "p2pCourseTestId" };
    serviceMock.removeFilePost.mockResolvedValue(undefined);
    await controller.removeFilePost(req, res);
    expect(serviceMock.removeFilePost).toHaveBeenCalledWith(
      "p2pCourseTestId",
      "postTestId"
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("Calls create new p2p course correctly", async () => {
    const p2pCourseDto: P2PCourseDTO = {
      id: "postTestId",
      studentId: "testStudentId",
      teacherId: "testTeacherId",
      chatId: "testChatId",
      name: "testName",
      remainingSession: 10,
      status: "ACTIVE",
      posts: [],
      files: [],
      sessions: [],
    };
    req.body = p2pCourseDto;
    const p2pCourseDomain = P2PCourseMapper.dtoToDomain(p2pCourseDto);
    serviceMock.create.mockResolvedValue(p2pCourseDomain);
    await controller.create(req, res);
    expect(serviceMock.create).toHaveBeenCalledWith(p2pCourseDomain);
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("Calls get p2p by courseId and userId course correctly", async () => {
    req.params = { p2pCourseId: "p2pCourseTestId" };
    await controller.getByUserIdAndCourseId(req, res);
    expect(serviceMock.getByUserIdAndCourseId).toHaveBeenCalledWith(
      "p2pCourseTestId",
      "testTeacherId"
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });
});
