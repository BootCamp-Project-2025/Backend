import "reflect-metadata";
import { Request, Response } from "express";
import { IGetUserProfileDto } from "@/contexts/CoreContext/domain/interfaces/dtos/IGetUserProfileDto";
import { IUserService } from "@/contexts/CoreContext/domain/interfaces/services/IUserService";
import { UserController } from "@/contexts/CoreContext/presentation/http/controllers/UserController";

describe("UserController.getUserProfile", () => {
  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  it("Should return 200 with profile when found", async () => {
    const profile: IGetUserProfileDto = {
      userName: "Pepe",
      userEmail: "pepe@gmail.com",
      profilePicture: "https://abc.png",
    };
    const mockService = {
      getClientProfile: jest.fn().mockResolvedValue(profile),
    } as unknown as IUserService;
    const ctrl = new UserController(mockService);
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    await ctrl.getUserProfile(req, res);

    expect(mockService.getClientProfile).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(profile);
  });

  it("should return 404 when service returns null", async () => {
    const mockService = {
      getClientProfile: jest.fn().mockResolvedValue(null),
    } as unknown as IUserService;
    const ctrl = new UserController(mockService);
    const req = { params: { id: "2" } } as unknown as Request;
    const res = mockResponse();

    await ctrl.getUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Client Profile not found",
    });
  });

  it("should return 500 on service error", async () => {
    const mockService = {
      getClientProfile: jest.fn().mockRejectedValue(new Error("oops")),
    } as unknown as IUserService;
    const ctrl = new UserController(mockService);
    const req = { params: { id: "3" } } as unknown as Request;
    const res = mockResponse();

    await ctrl.getUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
