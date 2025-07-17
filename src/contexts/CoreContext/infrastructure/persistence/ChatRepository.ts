/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from "tsyringe";
import { IChatRepository } from "../../domain/interfaces/repositories/IChatRepository";
import { Chat } from "../../domain/aggregates/Chat";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ChatMapper } from "../../mappers/ChatMapper";
import { ChatDao } from "../../domain/interfaces/dao/ChatDao";

@injectable()
export class ChatRepository implements IChatRepository {
  async findManyByUserId(userId: string): Promise<Chat[]> {
    try {
      const userPrisma = await PrismaClient.user.findFirst({
        where: { id: userId },
        include: {
          chats: {
            include: {
              participants: {
                select: {
                  id: true,
                },
              },
              messages: { orderBy: { timestamp: "asc" } },
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
      console.log(error);
      throw new ApiError();
    }
  }
  getAll(): Promise<Chat[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Chat | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  async create(object: Chat): Promise<Chat> {
    try {
      const chatPrisma = ChatMapper.DomainToPersistence(object);
      const newChat = await PrismaClient.chat.create({
        data: {
          name: chatPrisma.name,
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
      console.log(error);
      throw new ApiError();
    }
  }
  update(id: string, object: Chat): Promise<void | Chat> {
    throw new Error("Method not implemented.");
  }
}
