import { Client } from "../../aggregates/Client";
export interface IClientRepository {
  getClientProfileById(id: string): Promise<Client | null>;
  updateClientProfile(clientId: string, clientProfile: Client): Promise<Client>;
}
