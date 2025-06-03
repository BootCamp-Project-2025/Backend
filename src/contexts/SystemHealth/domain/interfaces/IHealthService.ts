import { IGeneralHealth } from "./IGeneralHealth";

export interface IHealthService {
  getHealthStatus(): Promise<IGeneralHealth>;
}
