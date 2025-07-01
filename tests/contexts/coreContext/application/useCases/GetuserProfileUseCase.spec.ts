import "reflect-metadata";
import { GetUserProfileUseCase } from "@/contexts/CoreContext/application/useCases/GetUserProfileUseCase";
import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { IGetUserProfileDto } from "@/contexts/CoreContext/domain/interfaces/dtos/IGetUserProfileDto";
import { IUserRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { UserEmail } from "@/contexts/CoreContext/domain/valueObjects/UserEmail";
import { UserName } from "@/contexts/CoreContext/domain/valueObjects/UserName";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

describe("GetUserProfileUseCase", () => {
  it("returns profile dto when repostitory returns a user", async () => {
    const user = User.create({
      userName: UserName.create("Pepe"),
      userEmail: UserEmail.create("pepe@gmail.com"),
      roles: ["CLIENT"],
      profilePicture: "http://img.png",
      createdAt: new Date(),
      clientId: new UniqueEntityID(),
    });
    const mockRepo: IUserRepository = {
      getUserProfileById: jest.fn().mockResolvedValue(user),
    } as any;

    const useCase = new GetUserProfileUseCase(mockRepo);
    const result = await useCase.execute("1");

    expect(mockRepo.getUserProfileById).toHaveBeenCalledWith("1");
    expect(result).toEqual({
      userName: "Pepe",
      userEmail: "pepe@gmail.com",
      profilePicture: "http://img.png",
    } as IGetUserProfileDto);
  });

  it("throws error if repository returns null", async () => {
    const mockRepo: IUserRepository = {
      getUserProfileById: jest.fn().mockResolvedValue(null),
    } as any;

    const useCase = new GetUserProfileUseCase(mockRepo);
    await expect(useCase.execute("1")).rejects.toThrow("User not found");
  });
});
