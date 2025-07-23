/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from "tsyringe";
import { IMessageRepository } from "../../domain/interfaces/repositories/IMessageRepository";
import { Message } from "../../domain/entities/Message";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { MessageMapper } from "../../mappers/MessageMapper";
import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/library";
import { StatusCodes } from "http-status-codes";
import { MessageDao } from "../../domain/interfaces/dao/MessageDao";

@injectable()
export class MessageRepository implements IMessageRepository {
  async markChatMessagesAsRead(chatId: string, userId: string): Promise<void> {
    try {
      await PrismaClient.chat.findUniqueOrThrow({
        where: { id: chatId },
        select: { id: true },
      });
      await PrismaClient.user.findUniqueOrThrow({
        where: { id: userId },
        select: { id: true },
      });
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
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `${error.meta?.modelName ?? "Resource"} not found`
        );
      } else {
        throw new ApiError();
      }
    }
  }

  async findManyByChatId(chatId: string): Promise<Message[]> {
    try {
      await PrismaClient.chat.findUniqueOrThrow({
        where: { id: chatId },
        select: { id: true },
      });
      const messagesPrisma = await PrismaClient.message.findMany({
        where: { chatId: chatId },
        include: { receivers: { select: { id: true } } },
      });
      const messagesDao = messagesPrisma.map((message) => {
        return { ...message, receiversIds: message.receivers.map((r) => r.id) };
      });
      const messagesDomain = MessageMapper.ManyPersistenceToDomain(messagesDao);
      return messagesDomain;
    } catch (error) {
      console.log(error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `${error.meta?.modelName ?? "Resource"} not found`
        );
      } else {
        throw new ApiError();
      }
    }
  }

  getAll(): Promise<Message[]> {
    throw new Error("Method not implemented.");
  }

  async getById(id: string): Promise<Message | null> {
    try {
      const messagePrisma = await PrismaClient.message.findFirst({
        where: { id: id },
        include: { receivers: { select: { id: true } } },
      });
      if (!messagePrisma) {
        return null;
      }
      const messageDao = {
        ...messagePrisma,
        receiversIds: messagePrisma.receivers.map((r) => r.id),
      };
      const messageDomain = MessageMapper.PersistenceToDomain(messageDao);
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
      const messageDao: MessageDao = MessageMapper.DomainToPersistence(object);
      const chat = await PrismaClient.chat.findFirstOrThrow({
        where: { id: messageDao.chatId },
        include: { participants: { select: { id: true } } },
      });
      const receiversIds = chat.participants
        .map((p) => p.id)
        .filter((id) => id != messageDao.senderId);
      const newMessagePrisma = await PrismaClient.message.create({
        data: {
          id: messageDao.id,
          content: messageDao.content,
          timestamp: messageDao.timestamp.toISOString(),
          type: messageDao.type,
          chat: {
            connect: { id: messageDao.chatId },
          },
          sender: {
            connect: { id: messageDao.senderId },
          },
          receivers: { connect: receiversIds.map((id) => ({ id })) },
        },
        include: {
          receivers: { select: { id: true } },
        },
      });
      const newMessageDao = {
        ...newMessagePrisma,
        receiversIds: newMessagePrisma.receivers.map((r) => r.id),
      };
      const newMessageDomain = MessageMapper.PersistenceToDomain(newMessageDao);
      return newMessageDomain;
    } catch (error) {
      console.log(error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Error saving the message, duplicated ids"
        );
      }
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `${error.meta?.modelName ?? "Resource"} not found`
        );
      } else {
        throw new ApiError();
      }
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
        include: { receivers: { select: { id: true } } },
      });
      const messageDao = {
        ...messagePrisma,
        receiversIds: updatedMessagePrisma.receivers.map((r) => r.id),
      };
      const updatedMessageDomain =
        MessageMapper.PersistenceToDomain(messageDao);
      return updatedMessageDomain;
    } catch (error) {
      console.log(error);

      throw new ApiError();
    }
  }
}
