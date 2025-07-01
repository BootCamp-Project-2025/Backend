import "reflect-metadata";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
import { IAboutRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IAboutRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import GetAboutUseCase from "@/contexts/CoreContext/application/useCases/GetAboutUseCase";

describe("GetAboutUseCase", () => {
  let aboutRepository: jest.Mocked<IAboutRepository>;
  let useCase: GetAboutUseCase;

  beforeEach(() => {
    aboutRepository = {
      get: jest.fn(),
      create: jest.fn(),
    };

    useCase = new GetAboutUseCase(aboutRepository);
  });

  it("should return About when repository resolves", async () => {
    const freelancerId = "freelancer-123";
    const about = About.create("A".repeat(60));

    aboutRepository.get.mockResolvedValue(about);

    const result = await useCase.execute(freelancerId);

    expect(aboutRepository.get).toHaveBeenCalledWith(freelancerId);
    expect(result).toBe(about);
  });

  it("should throw ApiError when repository throws a known ApiError", async () => {
    const freelancerId = "freelancer-456";
    const error = new ApiError(StatusCodes.NOT_FOUND, "Not found");

    aboutRepository.get.mockRejectedValue(error);

    await expect(useCase.execute(freelancerId)).rejects.toThrow(ApiError);
    expect(aboutRepository.get).toHaveBeenCalledWith(freelancerId);
  });

  it("should wrap unknown errors in ApiError", async () => {
    const freelancerId = "freelancer-789";
    const genericError = new ApiError(
      StatusCodes.NOT_FOUND,
      "Unexpected failure"
    );

    aboutRepository.get.mockRejectedValue(genericError);

    await expect(useCase.execute(freelancerId)).rejects.toThrow(ApiError);
  });
});
