import "reflect-metadata";
import { IClientService } from "@/contexts/CoreContext/domain/interfaces/services/IClientService";
import { Request, Response } from "express";
import ClientMapper from "@/contexts/CoreContext/mappers/ClientMapper";
import { IClientProfileDto } from "@/contexts/CoreContext/domain/interfaces/dtos/IClientProfileDto";
import { ClientController } from "@/contexts/CoreContext/presentation/http/controllers/ClientController";
import { ClientMother } from "../useCases/client/ClientMotherMock";

const mockClientService: jest.Mocked<IClientService> = {
  get: jest.fn(),
  update: jest.fn(),
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("ClientController - update", () => {
  let controller: ClientController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new ClientController(mockClientService);
  });

  it("should update the client and return success response", async () => {
    const mockClient = ClientMother.createValidClient();
    const clientDto: IClientProfileDto =
      ClientMapper.domainToGetClientDto(mockClient);

    const req = {
      params: { id: mockClient.clientId.toString() },
      body: clientDto,
    } as unknown as Request;

    const res = mockResponse();

    mockClientService.update.mockResolvedValue(mockClient);

    await controller.update(req, res);

    expect(mockClientService.update).toHaveBeenCalledWith(
      mockClient.clientId.toString(),
      expect.anything()
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: clientDto,
        message: "Client updated successfully",
      })
    );
  });

  it("should throw UNAUTHORIZED if clientId is missing", async () => {
    const req = {
      params: {},
      body: {} as IClientProfileDto,
    } as unknown as Request;

    const res = mockResponse();

    await expect(controller.update(req, res)).rejects.toThrow(
      "Failed to update user"
    );
  });

  it("should return 500 if update fails", async () => {
    const mockClient = ClientMother.createValidClient();
    const clientDto: IClientProfileDto =
      ClientMapper.domainToGetClientDto(mockClient);

    const req = {
      params: { id: mockClient.clientId.toString() },
      body: clientDto,
    } as unknown as Request;

    const res = mockResponse();

    mockClientService.update.mockRejectedValue(new Error("Update failed"));

    await expect(controller.update(req, res)).rejects.toThrow(
      "Failed to update user"
    );
  });
});
