import { CheckAPIHealthStatus } from "../../application/useCases/CheckAPIHealthStatus";
import { CheckDBHealthUseCase } from "../../application/useCases/CheckDBHealthStatus";
import { GeneralHealth } from "../../domain/implementations/GeneralHealth";
import { IHealthService } from "../../domain/interfaces/IHealthService";

export class HealthService implements IHealthService {
  constructor(
    private checkDBHealthUseCase: CheckDBHealthUseCase,
    private checkAPIHealthStatus: CheckAPIHealthStatus
  ) {}
  async getHealthStatus(): Promise<GeneralHealth> {
    try {
      const apiStatus = this.checkAPIHealthStatus.execute();
      const dbStatus = await this.checkDBHealthUseCase.execute();
      return new GeneralHealth(apiStatus, dbStatus);
    } catch (error) {
      console.log(error);
      throw new Error("Server is not working");
    }
  }
}
