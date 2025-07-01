import "reflect-metadata";

import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ErrorResponseEntity } from "@/contexts/Shared/domain/entity/ErrorResponseEntity";
import { StatusCodes } from "http-status-codes";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import UserMapper from "@/contexts/CoreContext/mappers/UserMapper";
import { AuthController } from "@/contexts/CoreContext/presentation/http/controllers/AuthController";

jest.mock("@/contexts/Shared/application/services/ResponseService");
jest.mock("@/contexts/CoreContext/mappers/UserMapper");

describe("AuthController.syncUser", () => {
  let userService: any;
  let controller: AuthController;
  let req: any;
  let res: any;

  beforeEach(() => {
    jest.clearAllMocks();

    userService = {
      syncUser: jest.fn(),
    };
    controller = new AuthController(userService);

    req = {
      user: {
        id: "user-id",
        name: "Test User",
        email: "test@example.com",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (UserMapper.createUserDtoTodomain as jest.Mock).mockImplementation(
      (dto) => ({ ...dto, domain: true })
    );
    (UserMapper.domainToGetUserDto as jest.Mock).mockImplementation((user) => ({
      ...user,
      dto: true,
    }));
    (ResponseService.send as jest.Mock).mockImplementation(
      (_res, _entity) => {}
    );
  });

  it("should sync user and send success response", async () => {
    const syncedUser = { id: "user-id", name: "Test User", domain: true };
    userService.syncUser.mockResolvedValue(syncedUser);

    await controller.syncUser(req, res);

    expect(UserMapper.createUserDtoTodomain).toHaveBeenCalledWith({
      id: "user-id",
      userName: "Test User",
      userEmail: "test@example.com",
      profilePictureSrc: "https://example.com/default-profile.png",
    });

    expect(userService.syncUser).toHaveBeenCalledWith(
      expect.objectContaining({ id: "user-id" })
    );
    expect(UserMapper.domainToGetUserDto).toHaveBeenCalledWith(syncedUser);
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(SuccessResponseEntity)
    );

    const responseArg = (ResponseService.send as jest.Mock).mock.calls[0][1];
    expect(responseArg.statusCode).toBe(StatusCodes.CREATED);
    expect(responseArg.message).toBe("User created successfully");
  });

  it("should send UNAUTHORIZED error if req.user is missing", async () => {
    req.user = undefined;

    await controller.syncUser(req, res);

    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(ErrorResponseEntity)
    );
    const errorEntity = (ResponseService.send as jest.Mock).mock.calls[0][1];
    expect(errorEntity.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(errorEntity.message).toBe("Internal server error");
  });

  it("should handle errors from userService.syncUser gracefully", async () => {
    userService.syncUser.mockRejectedValue(new Error("DB error"));

    await controller.syncUser(req, res);

    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.any(ErrorResponseEntity)
    );
    const errorEntity = (ResponseService.send as jest.Mock).mock.calls[0][1];
    expect(errorEntity.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(errorEntity.message).toBe("Internal server error");
  });
});
