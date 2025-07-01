import "reflect-metadata";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
import { IAboutRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IAboutRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import UpdateAboutUseCase from "@/contexts/CoreContext/application/useCases/UpdateAboutUseCase";

describe("UpdateAboutUseCase", () => {
  let aboutRepository: jest.Mocked<IAboutRepository>;
  let useCase: UpdateAboutUseCase;

  beforeEach(() => {
    aboutRepository = {
      get: jest.fn(),
      update: jest.fn(),
    };

    useCase = new UpdateAboutUseCase(aboutRepository);
  });

  it("should call aboutRepository.update with correct args", async () => {
    const freelancerId = "freelancer-001";
    const about = About.update(
      "Esta es una descripción válida con más de 50 caracteres."
    );

    await useCase.execute({ freelancerId, about });

    expect(aboutRepository.update).toHaveBeenCalledWith(freelancerId, about);
  });

  it("should throw same ApiError if repository throws ApiError", async () => {
    const freelancerId = "freelancer-002";
    const about = About.update(
      "Otra descripción válida de prueba con 50+ caracteres"
    );
    const error = new ApiError(StatusCodes.BAD_REQUEST, "Something failed");

    aboutRepository.update.mockImplementation(() => {
      throw error;
    });

    await expect(useCase.execute({ freelancerId, about })).rejects.toThrow(
      ApiError
    );
    expect(aboutRepository.update).toHaveBeenCalledWith(freelancerId, about);
  });

  it("should throw generic ApiError if unknown error is thrown", async () => {
    const freelancerId = "freelancer-003";
    const about = About.update(
      "Descripción aún más larga para testear error genérico"
    );
    const genericError = new Error("boom");

    aboutRepository.update.mockImplementation(() => {
      throw genericError;
    });

    await expect(useCase.execute({ freelancerId, about })).rejects.toThrow(
      ApiError
    );
  });
});
