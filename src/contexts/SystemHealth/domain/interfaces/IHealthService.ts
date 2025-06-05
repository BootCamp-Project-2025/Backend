import { ISampleDataRequest } from "../dto/ISampleDataReqDto";
import { ISampleDataResponse } from "../dto/ISampleDataResDto";
import { IGeneralHealth } from "./IGeneralHealth";

export interface IHealthService {
  getHealthStatus(): Promise<IGeneralHealth>;
  saveSampleDataToDb(
    sampleData: ISampleDataRequest
  ): Promise<ISampleDataResponse | undefined>;
}
