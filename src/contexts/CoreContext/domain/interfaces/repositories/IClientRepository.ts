import { Client } from "../../aggregates/Client";
export interface IClientRepository {
  getClientProfileById(id: string): Promise<Client>;
  updateClientProfile(clientId: string, clientProfile: Client): Promise<Client>;
}
