/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from "tsyringe";
import { IMessageRepository } from "../../domain/interfaces/repositories/IMessageRepository";
import { Message } from "../../domain/entities/Message";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { MessageMapper } from "../../mappers/MessageMapper";

@injectable()
export class MessageRepository implements IMessageRepository {
  async markChatMessagesAsRead(chatId: string, userId: string): Promise<void> {
    try {
      await PrismaClient.message.updateMany({
        where: {
          chatId: chatId,
          NOT: {
            senderId: userId,
          },
        },
        data: {
          status: "READ",
        },
      });
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  }
  async findManyByChatId(chatId: string): Promise<Message[]> {
    try {
      const messagesPrisma = await PrismaClient.message.findMany({
        where: { chatId: chatId },
      });
      const messagesDomain =
        MessageMapper.ManyPersistenceToDomain(messagesPrisma);
      return messagesDomain;
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  }
  getAll(): Promise<Message[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<Message | null> {
    try {
      const messagePrisma = await PrismaClient.message.findFirst({
        where: { id: id },
      });
      if (!messagePrisma) {
        return null;
      }
      const messageDomain = MessageMapper.PersistenceToDomain(messagePrisma);
      return messageDomain;
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  }
  delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  async create(object: Message): Promise<Message> {
    try {
      const messagePrisma = MessageMapper.DomainToPersistence(object);
      const newMessagePrisma = await PrismaClient.message.create({
        data: {
          content: messagePrisma.content,
          timestamp: messagePrisma.timestamp,
          type: messagePrisma.type,
          chat: {
            connect: { id: messagePrisma.chatId },
          },
          sender: {
            connect: { id: messagePrisma.senderId },
          },
        },
      });
      const newMessageDomain =
        MessageMapper.PersistenceToDomain(newMessagePrisma);
      return newMessageDomain;
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  }
  async update(id: string, object: Message): Promise<void | Message> {
    try {
      const messagePrisma = MessageMapper.DomainToPersistence(object);
      const updatedMessagePrisma = await PrismaClient.message.update({
        where: { id: id },
        data: {
          content: messagePrisma.content,
          type: messagePrisma.type,
          status: messagePrisma.status,
        },
      });
      const updatedMessageDomain =
        MessageMapper.PersistenceToDomain(updatedMessagePrisma);
      return updatedMessageDomain;
    } catch (error) {
      console.log(error);

      throw new ApiError();
    }
  }
}
