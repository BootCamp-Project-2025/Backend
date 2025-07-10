import "reflect-metadata";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import type { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { UpdateRoleUseCase } from "@/contexts/CoreContext/application/useCases/auth/UpdateRoleUseCase";

describe("UpdateRoleUseCase", () => {
  let mockUserId: { toString: jest.Mock<string, []> };
  let mockUser: User;
  let authService: {
    updateUserRoles: jest.Mock<Promise<void>, [string, string]>;
  };
  let userRepository: {
    addFreelancerProfile: jest.Mock<Promise<User | null>, [string]>;
  };
  let useCase: UpdateRoleUseCase;

  beforeEach(() => {
    mockUserId = { toString: jest.fn() };
    mockUser = { id: mockUserId } as unknown as User;

    authService = {
      updateUserRoles: jest.fn(),
    };

    userRepository = {
      addFreelancerProfile: jest.fn(),
    };

    useCase = new UpdateRoleUseCase(authService as any, userRepository as any);
  });

  it("should update user roles and add freelancer profile", async () => {
    mockUserId.toString.mockReturnValue("user-id");
    authService.updateUserRoles.mockResolvedValue();
    userRepository.addFreelancerProfile.mockResolvedValue(mockUser);

    await expect(
      useCase.execute({ user: mockUser, role: "freelancer" })
    ).resolves.toBeUndefined();

    expect(authService.updateUserRoles).toHaveBeenCalledWith(
      "user-id",
      "freelancer"
    );
    expect(userRepository.addFreelancerProfile).toHaveBeenCalledWith("user-id");
  });

  it("should throw ApiError if params are missing", async () => {
    await expect(useCase.execute(undefined)).rejects.toBeInstanceOf(ApiError);
    await expect(useCase.execute(undefined)).rejects.toMatchObject({
      statusCode: StatusCodes.UNAUTHORIZED,
    });
  });

  it("should throw ApiError if addFreelancerProfile returns null", async () => {
    mockUserId.toString.mockReturnValue("user-id");
    authService.updateUserRoles.mockResolvedValue();
    userRepository.addFreelancerProfile.mockResolvedValue(null);

    await expect(
      useCase.execute({ user: mockUser, role: "freelancer" })
    ).rejects.toBeInstanceOf(ApiError);
    await expect(
      useCase.execute({ user: mockUser, role: "freelancer" })
    ).rejects.toMatchObject({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  });

  it("should propagate errors from authService.updateUserRoles", async () => {
    mockUserId.toString.mockReturnValue("user-id");
    authService.updateUserRoles.mockRejectedValue(new Error("Auth error"));

    await expect(
      useCase.execute({ user: mockUser, role: "freelancer" })
    ).rejects.toThrow("Auth error");
  });

  it("should propagate errors from userRepository.addFreelancerProfile", async () => {
    mockUserId.toString.mockReturnValue("user-id");
    authService.updateUserRoles.mockResolvedValue();
    userRepository.addFreelancerProfile.mockRejectedValue(
      new Error("Repo error")
    );

    await expect(
      useCase.execute({ user: mockUser, role: "freelancer" })
    ).rejects.toThrow("Repo error");
  });
});
