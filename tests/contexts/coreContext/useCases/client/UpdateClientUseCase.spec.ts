import "reflect-metadata";
import { UpdateClientUseCase } from "@/contexts/CoreContext/application/useCases/client/UpdateClientUseCase";
import { IClientRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IClientRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ClientMother } from "./ClientMotherMock";
import { Client } from "@/contexts/CoreContext/domain/aggregates/Client";

describe("UpdateClientUseCase", () => {
  const mockClientRepository: jest.Mocked<IClientRepository> = {
    getClientProfileById: jest.fn(),
    updateClientProfile: jest.fn(),
  };

  let useCase: UpdateClientUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new UpdateClientUseCase(mockClientRepository);
  });

  it("should update the client successfully", async () => {
    const existingClient = ClientMother.createValidClient();
    const updatedClient = ClientMother.createValidClient();

    mockClientRepository.getClientProfileById.mockResolvedValue(existingClient);
    mockClientRepository.updateClientProfile.mockResolvedValue(updatedClient);

    const result = await useCase.execute({
      clientId: existingClient.clientId.toString(),
      clientData: updatedClient,
    });

    expect(mockClientRepository.getClientProfileById).toHaveBeenCalledWith(
      existingClient.clientId.toString()
    );
    expect(mockClientRepository.updateClientProfile).toHaveBeenCalledWith(
      existingClient.clientId.toString(),
      expect.anything()
    );
    expect(result).toBe(updatedClient);
  });

  it("should throw if the client does not exist", async () => {
    mockClientRepository.getClientProfileById.mockRejectedValue(
      new ApiError(404, "Client not found")
    );

    await expect(
      useCase.execute({
        clientId: "non-existent-id",
        clientData: ClientMother.createValidClient(),
      })
    ).rejects.toThrow("Client not found");
  });
  it("should throw ApiError if update fails", async () => {
    const existingClient = ClientMother.createValidClient();

    mockClientRepository.getClientProfileById.mockResolvedValue(existingClient);
    mockClientRepository.updateClientProfile.mockResolvedValue(
      null as unknown as Client
    );
    await expect(
      useCase.execute({
        clientId: existingClient.clientId.toString(),
        clientData: existingClient,
      })
    ).rejects.toThrow(ApiError);

    await expect(
      useCase.execute({
        clientId: existingClient.clientId.toString(),
        clientData: existingClient,
      })
    ).rejects.toThrow("Error while updating client");
  });
});
