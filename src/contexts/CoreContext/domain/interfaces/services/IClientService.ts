import { Client } from "../../aggregates/Client";

export interface IClientService {
  get(clientId: string): Promise<Client | null>;
  update(clientId: string, clientProfile: Client): Promise<Client>;
}
