/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from "tsyringe";
import { IChatRepository } from "../../domain/interfaces/repositories/IChatRepository";
import { Chat } from "../../domain/aggregates/Chat";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ChatMapper } from "../../mappers/ChatMapper";
import { ChatDao } from "../../domain/interfaces/dao/ChatDao";
import { StatusCodes } from "http-status-codes";
import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/library";

@injectable()
export class ChatRepository implements IChatRepository {
  async findManyByUserId(userId: string): Promise<Chat[]> {
    try {
      const userPrisma = await PrismaClient.user.findFirstOrThrow({
        where: { id: userId },
        include: {
          chats: {
            include: {
              participants: {
                select: {
                  id: true,
                },
              },
              messages: { orderBy: { timestamp: "desc" }, take: 1 },
            },
          },
        },
      });
      const chatsDao: ChatDao[] =
        userPrisma?.chats?.map((chat) => {
          return {
            ...chat,
            participantsIds: chat.participants.map((p) => p.id),
          };
        }) ?? [];
      const chatsDomain = ChatMapper.ManyPersistenceToDomain(chatsDao);
      return chatsDomain;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
      } else {
        throw new ApiError();
      }
    }
  }

  async getById(id: string): Promise<Chat | null> {
    try {
      const chatPrisma = await PrismaClient.chat.findFirst({
        where: { id },

        include: {
          messages: {
            orderBy: { timestamp: "asc" },
            include: { receivers: { select: { id: true } } },
          },
          participants: { select: { id: true } },
        },
      });
      if (chatPrisma) {
        const chatPrismaMapped: ChatDao = {
          ...chatPrisma,
          participantsIds: chatPrisma?.participants.map((p) => p.id),
          messages: chatPrisma.messages.map((message) => {
            return {
              ...message,
              receiversIds: message.receivers.map((r) => r.id),
            };
          }),
        };
        const chatDomain = ChatMapper.PersistenceToDomain(chatPrismaMapped);
        return chatDomain;
      } else return null;
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  }

  async create(object: Chat): Promise<Chat> {
    try {
      const chatPrisma = ChatMapper.DomainToPersistence(object);
      const newChat = await PrismaClient.chat.create({
        data: {
          name: chatPrisma.name,
          status: chatPrisma.status,
          participants: {
            connect: chatPrisma.participantsIds.map((id) => ({ id })),
          },
        },
        include: { participants: { select: { id: true } }, messages: true },
      });
      const newChatDao: ChatDao = {
        ...newChat,
        messages: newChat.messages,
        participantsIds: newChat.participants.map((p) => p.id),
      };
      const newChatDomain = ChatMapper.PersistenceToDomain(newChatDao);
      return newChatDomain;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
      } else {
        throw new ApiError();
      }
    }
  }

  async update(id: string, object: Chat): Promise<Chat> {
    try {
      const chatRepository = ChatMapper.DomainToPersistence(object);
      const updatedChatPrisma = await PrismaClient.chat.update({
        where: { id },
        data: {
          name: chatRepository.name,
          status: chatRepository.status,
        },
        include: {
          messages: { orderBy: { timestamp: "desc" }, take: 1 },
          participants: { select: { id: true } },
        },
      });
      const updatedChatDao: ChatDao = {
        ...updatedChatPrisma,
        participantsIds: updatedChatPrisma.participants.map((p) => p.id),
      };
      const updatedChatDomain = ChatMapper.PersistenceToDomain(updatedChatDao);
      return updatedChatDomain;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Chat not found");
      } else {
        throw new ApiError();
      }
    }
  }
}
