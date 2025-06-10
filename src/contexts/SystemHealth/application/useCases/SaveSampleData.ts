import { ISampleDataRequest } from "../../domain/dto/ISampleDataReqDto";
import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { SampleData } from "@/generated/prisma";

export class SaveSampleData {
  constructor() { }

  async save(sampleDataReq: ISampleDataRequest): Promise<SampleData> {
    try {
      const sampleDataRes = await prismaClient.sampleData.create({
        data: sampleDataReq,
      });
      return sampleDataRes;
    } catch (error) {
      console.log(error);
      throw new Error("An error occured on save");
    }
  }
}
