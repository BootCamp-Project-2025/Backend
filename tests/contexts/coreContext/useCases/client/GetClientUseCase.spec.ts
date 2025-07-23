import "reflect-metadata";
import { GetClientUseCase } from "@/contexts/CoreContext/application/useCases/client/GetClientUseCase";
import { IClientRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IClientRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ClientMother } from "./ClientMotherMock";

// Create a mocked version of IClientRepository
const mockClientRepository: jest.Mocked<IClientRepository> = {
  getClientProfileById: jest.fn(),
  updateClientProfile: jest.fn(),
};

describe("GetClientUseCase", () => {
  let useCase: GetClientUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetClientUseCase(mockClientRepository);
  });

  it("should return the client if it exists", async () => {
    const mockClient = ClientMother.createValidClient();
    mockClientRepository.getClientProfileById.mockResolvedValue(mockClient);

    const result = await useCase.execute(mockClient.clientId.toString());

    expect(result).toBe(mockClient);
    expect(mockClientRepository.getClientProfileById).toHaveBeenCalledWith(
      mockClient.clientId.toString()
    );
  });
  it("should throw an ApiError with NOT_FOUND if the client does not exist", async () => {
    mockClientRepository.getClientProfileById.mockRejectedValue(
      new ApiError(404, "Client not found.")
    );

    const result = useCase.execute("non-existent-id");

    await expect(result).rejects.toThrow(ApiError);
    await expect(result).rejects.toThrow("Client not found.");
  });

  it("should throw an ApiError with INTERNAL_SERVER_ERROR if an unexpected error occurs", async () => {
    mockClientRepository.getClientProfileById.mockRejectedValue(
      new Error("DB failure")
    );

    await expect(useCase.execute("some-id")).rejects.toThrow(ApiError);
    await expect(useCase.execute("some-id")).rejects.toThrow(
      "server error in get client use case"
    );
  });
});
