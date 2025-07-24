import "reflect-metadata";
import ClientService from "@/contexts/CoreContext/application/services/ClientService";
import { GetClientUseCase } from "@/contexts/CoreContext/application/useCases/client/GetClientUseCase";
import { UpdateClientUseCase } from "@/contexts/CoreContext/application/useCases/client/UpdateClientUseCase";
import { ClientMother } from "../../useCases/client/ClientMotherMock";

const mockGetClientUseCase = {
  execute: jest.fn(),
};

const mockUpdateClientUseCase = {
  execute: jest.fn(),
};

describe("ClientService", () => {
  let service: ClientService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ClientService(
      mockGetClientUseCase as unknown as GetClientUseCase,
      mockUpdateClientUseCase as unknown as UpdateClientUseCase
    );
  });

  describe("get", () => {
    it("should return client when getClientsUseCase.execute resolves", async () => {
      const mockClient = ClientMother.createValidClient();
      mockGetClientUseCase.execute.mockResolvedValue(mockClient);

      const result = await service.get(mockClient.clientId.toString());

      expect(mockGetClientUseCase.execute).toHaveBeenCalledWith(
        mockClient.clientId.toString()
      );
      expect(result).toBe(mockClient);
    });

    it("should return null when getClientsUseCase.execute resolves null", async () => {
      mockGetClientUseCase.execute.mockResolvedValue(null);

      const result = await service.get("non-existent-id");

      expect(mockGetClientUseCase.execute).toHaveBeenCalledWith(
        "non-existent-id"
      );
      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("should call updateClientUseCase.execute and return updated client", async () => {
      const mockClient = ClientMother.createValidClient();

      mockUpdateClientUseCase.execute.mockResolvedValue(mockClient);

      const result = await service.update(
        mockClient.clientId.toString(),
        mockClient
      );

      expect(mockUpdateClientUseCase.execute).toHaveBeenCalledWith({
        clientId: mockClient.clientId.toString(),
        clientData: mockClient,
      });
      expect(result).toBe(mockClient);
    });

    it("should throw if updateClientUseCase.execute throws", async () => {
      const mockClient = ClientMother.createValidClient();

      mockUpdateClientUseCase.execute.mockRejectedValue(
        new Error("Update failed")
      );

      await expect(
        service.update(mockClient.clientId.toString(), mockClient)
      ).rejects.toThrow("Update failed");
    });
  });
});
