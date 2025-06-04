import { SampleData } from "@/generated/prisma";
import { ISampleDataResponse } from "../domain/dto/ISampleDataResDto";

export class SampleDataMapper {
  public static toResponseDto(sampleData: SampleData): ISampleDataResponse {
    return sampleData;
  }
}
