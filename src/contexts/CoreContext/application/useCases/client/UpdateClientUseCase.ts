import { Client } from "@/contexts/CoreContext/domain/aggregates/Client";
import { IClientRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IClientRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateClientUseCase
  implements IUseCase<{ clientId: string; clientData: Client }, Client>
{
  constructor(
    @inject("IClientRepository")
    private readonly clientRepository: IClientRepository
  ) {}
  async execute({
    clientId,
    clientData,
  }: {
    clientId: string;
    clientData: Client;
  }): Promise<Client> {
    const client = await this.clientRepository.getClientProfileById(clientId);
    if (!client) throw new Error("Client not found");

    Object.assign(client, clientData);
    console.log(client, clientData, "DDSSSD");
    const updatedClient = await this.clientRepository.updateClientProfile(
      clientId,
      client
    );
    if (!updatedClient)
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error while updating client"
      );
    return updatedClient;
  }
}
