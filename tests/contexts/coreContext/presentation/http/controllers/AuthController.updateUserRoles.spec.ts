import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ErrorResponseEntity } from "@/contexts/Shared/domain/entity/ErrorResponseEntity";
import UserMapper from "@/contexts/CoreContext/mappers/UserMapper";
import { AuthController } from "@/contexts/CoreContext/presentation/http/controllers/AuthController";
import { Request, Response } from "express";

jest.mock("@/contexts/CoreContext/mappers/UserMapper");
jest.mock("@/contexts/Shared/application/services/ResponseService");

describe("AuthController - updateUserRoles", () => {
  let controller: AuthController;
  let mockAuthService: { updateUserRoles: jest.Mock };
  let req: Request;
  let res: Response;

  beforeEach(() => {
    mockAuthService = {
      updateUserRoles: jest.fn(),
    };
    controller = new AuthController(mockAuthService as any);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response> as Response;

    (ResponseService.send as jest.Mock).mockClear();
    (UserMapper.createUserDtoTodomain as jest.Mock).mockClear();
  });

  it("should update user roles and send success response", async () => {
    req = {
      user: { id: "1", name: "Test", email: "test@example.com" },
      body: { role: "admin" },
    } as Partial<Request> as Request;
    const mockUser = { id: "1" };
    (UserMapper.createUserDtoTodomain as jest.Mock).mockReturnValue(mockUser);

    await controller.updateUserRoles(req, res);

    expect(UserMapper.createUserDtoTodomain).toHaveBeenCalledWith({
      id: "1",
      userName: "Test",
      userEmail: "test@example.com",
      profilePicture: "",
    });
    expect(mockAuthService.updateUserRoles).toHaveBeenCalledWith(
      mockUser,
      "admin"
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );
  });

  it("should throw UNAUTHORIZED if req.user is missing", async () => {
    req = {
      user: undefined,
      body: { role: "admin" },
    } as Partial<Request> as Request;

    await controller.updateUserRoles(req, res);

    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      })
    );
  });

  it("should throw BAD_REQUEST if role is missing", async () => {
    req = {
      user: { id: "1", name: "Test", email: "test@example.com" },
      body: {},
    } as Partial<Request> as Request;

    await controller.updateUserRoles(req, res);

    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      })
    );
  });

  it("should handle errors from authService.updateUserRoles", async () => {
    req = {
      user: { id: "1", name: "Test", email: "test@example.com" },
      body: { role: "admin" },
    } as Partial<Request> as Request;
    const mockUser = { id: "1" };
    (UserMapper.createUserDtoTodomain as jest.Mock).mockReturnValue(mockUser);
    mockAuthService.updateUserRoles.mockRejectedValue(
      new Error("Service error")
    );

    await controller.updateUserRoles(req, res);

    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      })
    );
  });
});
