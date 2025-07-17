import { Client } from "@/contexts/CoreContext/domain/aggregates/Client";
import { IClientRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IClientRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetClientUseCase {
  constructor(
    @inject("IClientRepository")
    private readonly clientRepository: IClientRepository
  ) {}
  async execute(clientId: string): Promise<Client> {
    try {
      const client: Client =
        await this.clientRepository.getClientProfileById(clientId);
      if (client === null) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Client not found.");
      } else {
        return client;
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "server error in get client use case"
        );
      }
    }
  }
}
