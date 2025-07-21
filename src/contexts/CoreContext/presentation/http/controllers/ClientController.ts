import { IClientController } from "@/contexts/CoreContext/domain/interfaces/controllers/IClientController";
import { IClientService } from "@/contexts/CoreContext/domain/interfaces/services/IClientService";
import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import ClientMapper from "@/contexts/CoreContext/mappers/ClientMapper";
import { IClientProfileDto } from "@/contexts/CoreContext/domain/interfaces/dtos/IClientProfileDto";
import { Client } from "@/contexts/CoreContext/domain/aggregates/Client";

@injectable()
export class ClientController implements IClientController {
  constructor(
    @inject("IClientService") private readonly clientService: IClientService
  ) {}

  get = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const client = await this.clientService.get(id);
      if (client !== null) {
        const clientDto = ClientMapper.domainToGetClientDto(client);
        const response = new SuccessResponseEntity(
          clientDto,
          StatusCodes.OK,
          "Client retrieved successfully"
        );
        ResponseService.send(res, response);
      } else {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Client not found");
      }
    } catch (error) {
      if (error as ApiError) {
        throw error;
      } else {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
      }
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const clientId: string = req.params.id;
      const updateData: IClientProfileDto = req.body;

      if (!clientId) {
        throw new ApiError(
          StatusCodes.UNAUTHORIZED,
          "Client not authenticated"
        );
      }

      const client: Client = ClientMapper.persistanceTodomain(updateData);

      if (!client) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `Client with ID ${clientId} not found`
        );
      }

      const updatedClient = await this.clientService.update(clientId, client);
      const response = new SuccessResponseEntity(
        ClientMapper.domainToGetClientDto(updatedClient),
        StatusCodes.OK,
        "Client updated successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to update user"
      );
    }
  };
}
