import { inject, injectable } from "tsyringe";
import { IClientService } from "../../domain/interfaces/services/IClientService";
import { Client } from "../../domain/aggregates/Client";
import { GetClientUseCase } from "../useCases/client/GetClientUseCase";
import { UpdateClientUseCase } from "../useCases/client/UpdateClientUseCase";

@injectable()
export default class ClientService implements IClientService {
  constructor(
    @inject("GetClientUseCase")
    private readonly getClientsUseCase: GetClientUseCase,
    @inject("UpdateClientUseCase")
    private readonly updateClientUseCase: UpdateClientUseCase
  ) {}

  async get(clientId: string): Promise<Client | null> {
    return await this.getClientsUseCase.execute(clientId);
  }

  async update(clientId: string, clientData: Client): Promise<Client> {
    return this.updateClientUseCase.execute({
      clientId,
      clientData,
    });
  }
}
