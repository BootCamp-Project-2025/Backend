import { CheckAPIHealthStatus } from "../../application/useCases/CheckAPIHealthStatus";
import { CheckDBHealthUseCase } from "../../application/useCases/CheckDBHealthStatus";
import { GeneralHealth } from "../../domain/implementations/GeneralHealth";
import { IHealthService } from "../../domain/interfaces/IHealthService";
import { SaveSampleData } from "../../application/useCases/SaveSampleData";
import { ISampleDataRequest } from "../../domain/dto/ISampleDataReqDto";
import { ISampleDataResponse } from "../../domain/dto/ISampleDataResDto";
import { SampleDataMapper } from "../../mappers/SampleDataMapper";

export class HealthService implements IHealthService {
  constructor(
    private checkDBHealthUseCase: CheckDBHealthUseCase,
    private checkAPIHealthStatus: CheckAPIHealthStatus,
    private saveSampleData: SaveSampleData | null = null
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

  async saveSampleDataToDb(
    sampleData: ISampleDataRequest
  ): Promise<ISampleDataResponse | undefined> {
    try {
      const newSampleData = await this.saveSampleData?.save(sampleData);
      if (newSampleData) return SampleDataMapper.toResponseDto(newSampleData);
      else throw new Error("Error saving data");
    } catch (error) {
      console.log(error);
      throw new Error("Error saving data");
    }
  }
}
