import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { Request } from "../../domain/aggregates/Request";
import IRequestRepository from "../../domain/interfaces/repositories/IRequestRepository";
import RequestMapper from "../../mappers/RequestMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ChatStatus } from "@/generated/prisma";

export default class RequestRepository implements IRequestRepository {
  db = PrismaClient;
  async delete(requestId: string): Promise<void> {
    const request = await this.db.request.findFirst({
      where: { id: requestId },
      include: { proposals: true },
    });
    if (!request) {
      return;
    }

    const chatIds = request.proposals
      .map((p) => p.chatId)
      .filter((id): id is string => !!id);

    await PrismaClient.chat.updateMany({
      where: { id: { in: chatIds } },
      data: { status: ChatStatus.CLOSED },
    });
    await this.db.request.delete({ where: { id: requestId } });
  }
  async findById(requestId: string): Promise<Request | null> {
    const requestDb = await this.db.request.findUnique({
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
    const requestDb = await this.db.request.create({ data: requestDtoDb });
    return RequestMapper.dtoToDomain(requestDb);
  }

  async findAllActiveByUserId(
    userId: string,
    title: string
  ): Promise<Request[]> {
    const requestDb = await this.db.request.findMany({
      where: {
        userId,
        status: "AVAILABLE",
        title: { contains: title, mode: "insensitive" },
      },
      include: { proposals: true },
    });
    return RequestMapper.bulkDtoToDomain(requestDb);
  }

  async update(requestId: string, request: Request): Promise<Request> {
    try {
      const updatedRequest = await this.db.request.update({
        where: { id: requestId },
        data: {
          title: request.getTitle().value,
          description: request.getDescription().value,
          language: request.getLanguage().value,
          category: request.getCategory().value,
          subCategory: request.getSubcategory().value,
          updatedAt: new Date(),
        },
      });

      return RequestMapper.dtoToDomain(updatedRequest);
    } catch (error) {
      console.error(error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `${error.meta?.modelName ?? "Request"} not found`
        );
      }
      throw new ApiError();
    }
  }
}
