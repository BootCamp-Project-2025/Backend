import "reflect-metadata";
import { Request as ExpressRequest, Response } from "express";
import IRequestService from "@/contexts/CoreContext/domain/interfaces/services/IRequestService";
import { RequestController } from "@/contexts/CoreContext/presentation/http/controllers/RequestController";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import RequestMapper from "@/contexts/CoreContext/mappers/RequestMapper";

describe("", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const create = jest.fn();
  const deleteFunc = jest.fn();
  const getUserActiveRequest = jest.fn();

  const serviceMock: IRequestService = {
    delete: deleteFunc,
    create,
    getUserActiveRequest,
  };

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  const controller = new RequestController(serviceMock);
  it("exists", () => {
    expect(controller).toBeInstanceOf(RequestController);
  });

  it("calls the delete service correctly", () => {
    const req = {
      params: { requestId: "testId" },
    } as unknown as ExpressRequest;
    const res = mockResponse();
    expect(controller.delete(req, res)).resolves.toBeUndefined();
    expect(serviceMock.delete).toHaveBeenCalled();
  });

  it("throws error if no id is sent", async () => {
    const req = {} as unknown as ExpressRequest;
    const res = mockResponse();
    expect(controller.delete(req, res)).rejects.toThrow(ApiError);
  });
  it("create a new request correctly", () => {
    const request = {
      id: "string",
      title: "string",
      description: "string",
      language: "string",
      category: "string",
      subcategory: "string",
      status: "AVAILABLE",
      userId: "string",
      estimation: 200,
      edited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      proposals: [],
    };
    const req = {
      body: request,
      user: { id: "testId" },
    } as unknown as ExpressRequest;
    const res = mockResponse();
    create.mockResolvedValue(RequestMapper.dtoToDomain(request));
    expect(controller.create(req, res)).resolves.toBeUndefined();
  });

  it("Error if sent bad data", () => {
    const request = {
      id2: "string",
    };
    const req = { body: request } as unknown as ExpressRequest;
    const res = mockResponse();
    expect(controller.create(req, res)).rejects.toThrow(ApiError);
  });

  it("get a the list of valid courses", () => {
    const request = {
      id: "string",
      title: "string",
      description: "string",
      language: "string",
      category: "string",
      subcategory: "string",
      status: "AVAILABLE",
      estimation: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const requestList = [request, request];

    const req = {
      user: { id: "testId" },
      query: { title: "testTitle" },
    } as unknown as ExpressRequest;
    const res = mockResponse();
    getUserActiveRequest.mockResolvedValue(
      RequestMapper.bulkDtoToDomain(requestList)
    );
    expect(controller.getUserActiveRequest(req, res)).resolves.toBeUndefined();
  });

  it("throw error when getting the list of valid courses if the id is not in the token", () => {
    const req = {} as unknown as ExpressRequest;
    const res = mockResponse();
    expect(controller.getUserActiveRequest(req, res)).rejects.toThrow(ApiError);
  });

  it("throw error when it catch some error in the create service", () => {
    const req = { user: { id: "testId" } } as unknown as ExpressRequest;
    const res = mockResponse();
    create.mockRejectedValue("error");
    expect(controller.create(req, res)).rejects.toThrow(ApiError);
  });

  it("throw error when it catch some error in the delete service", () => {
    const req = {
      params: { requestId: "testId" },
    } as unknown as ExpressRequest;
    const res = mockResponse();
    deleteFunc.mockRejectedValue("error");
    expect(controller.delete(req, res)).rejects.toThrow(ApiError);
  });

  it("throw error when it catch some error in the getUserActiveRequest service", () => {
    const req = {
      user: { id: "testId" },
      query: { title: "testTitle" },
    } as unknown as ExpressRequest;
    const res = mockResponse();
    getUserActiveRequest.mockRejectedValue("error");
    expect(controller.getUserActiveRequest(req, res)).rejects.toThrow(ApiError);
  });

  it("throw the catch ApiError when it catch some error in the create service", () => {
    const req = { user: { id: "testId" } } as unknown as ExpressRequest;
    const res = mockResponse();
    const error = new ApiError();
    create.mockRejectedValue(error);
    expect(controller.create(req, res)).rejects.toStrictEqual(error);
  });

  it("throw the catch ApiError when it catch some error in the delete service", () => {
    const req = {
      params: { requestId: "testId" },
    } as unknown as ExpressRequest;
    const res = mockResponse();
    const error = new ApiError();
    deleteFunc.mockRejectedValue(error);
    expect(controller.delete(req, res)).rejects.toStrictEqual(error);
  });

  it("throw the catch ApiError when it catch some error in the getUserActiveRequest service", () => {
    const req = {
      user: { id: "testId" },
      query: { title: "testTitle" },
    } as unknown as ExpressRequest;
    const res = mockResponse();
    const error = new ApiError();
    getUserActiveRequest.mockRejectedValue(error);
    expect(controller.getUserActiveRequest(req, res)).rejects.toStrictEqual(
      error
    );
  });
});
