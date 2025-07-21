import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { Request } from "../../domain/aggregates/Request";
import IRequestRepository from "../../domain/interfaces/repositories/IRequestRepository";
import RequestMapper from "../../mappers/RequestMapper";

export default class RequestRepository implements IRequestRepository {
  async delete(requestId: string): Promise<void> {
    await PrismaClient.request.delete({ where: { id: requestId } });
  }
  async findById(requestId: string): Promise<Request | null> {
    const requestDb = await PrismaClient.request.findUnique({
      where: { id: requestId },
      include: { proposals: true },
    });
    if (!requestDb) {
      return null;
    }
    return RequestMapper.dtoToDomain(requestDb);
  }

  async create(request: Request): Promise<Request> {
    const requestDtoDb = RequestMapper.domainToPersistance(request);
    const requestDb = await PrismaClient.request.create({ data: requestDtoDb });
    return RequestMapper.dtoToDomain(requestDb);
  }

  async findAllActiveByUserId(userId: string): Promise<Request[]> {
    const requestDb = await PrismaClient.request.findMany({
      where: { userId: userId },
      include: { proposals: true },
    });
    return RequestMapper.bulkDtoToDomain(requestDb);
  }
}
