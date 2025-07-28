import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import DeleteStudentTrackProgressUseCase from "@/contexts/LearningContext/application/useCases/studentTrackProgress/DeleteStudentTrackProgressUseCase";

const mockTrackRepository = {
  findById: jest.fn(),
  delete: jest.fn(),
};

function makeUseCase() {
  return new DeleteStudentTrackProgressUseCase(mockTrackRepository as any);
}

describe("DeleteStudentTrackProgressUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe borrar si existe el track", async () => {
    mockTrackRepository.findById.mockResolvedValue({ id: "track1" });
    mockTrackRepository.delete.mockResolvedValue(undefined);

    const useCase = makeUseCase();
    await expect(useCase.execute("track1")).resolves.toBeUndefined();

    expect(mockTrackRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockTrackRepository.delete).toHaveBeenCalledWith("track1");
  });

  it("debe lanzar ApiError 404 si no existe el track", async () => {
    mockTrackRepository.findById.mockResolvedValue(undefined);

    const useCase = makeUseCase();
    await expect(useCase.execute("track1")).rejects.toThrow(ApiError);
    expect(mockTrackRepository.delete).not.toHaveBeenCalled();
  });

  it("debe propagar ApiError si ocurre en el try", async () => {
    mockTrackRepository.findById.mockImplementation(() => {
      throw new ApiError(StatusCodes.BAD_REQUEST, "bad");
    });
    const useCase = makeUseCase();

    await expect(useCase.execute("track1")).rejects.toThrow(ApiError);
  });

  it("debe lanzar ApiError 500 si ocurre error desconocido", async () => {
    mockTrackRepository.findById.mockRejectedValue(new Error("fail"));
    const useCase = makeUseCase();

    await expect(useCase.execute("track1")).rejects.toThrow(ApiError);
  });
});
