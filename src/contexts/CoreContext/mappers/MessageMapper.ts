import { Message } from "../domain/entities/Message";
import { Message as MessagePrisma } from "@/generated/prisma";
import { MessageDto } from "../domain/interfaces/dtos/IMessageDto";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { MessageDao } from "../domain/interfaces/dao/MessageDao";

export class MessageMapper {
  public static DtoToDomain(messageDto: MessageDto): Message {
    return Message.create(
      {
        chatId: new UniqueEntityID(messageDto.chatId),
        content: messageDto.content,
        senderId: new UniqueEntityID(messageDto.senderId),
        timestamp: messageDto.timestamp,
        type: messageDto.type,
        status: messageDto.status,
        receiversIds:
          messageDto.receiversIds?.map((id) => new UniqueEntityID(id)) ?? [],
      },
      new UniqueEntityID(messageDto.id)
    );
  }

  public static DomainToDto(messageDomain: Message): MessageDto {
    return {
      id: messageDomain.id.toString(),
      chatId: messageDomain.chatId.toString(),
      content: messageDomain.content,
      senderId: messageDomain.senderId.toString(),
      status: messageDomain.status,
      timestamp: messageDomain.timestamp,
      type: messageDomain.type,
      receiversIds: messageDomain.receiversIds.map((id) => id.toString()),
    };
  }

  public static DomainToPersistence(messageDomain: Message): MessageDao {
    return {
      id: messageDomain.id.toString(),
      chatId: messageDomain.chatId.toString(),
      content: messageDomain.content,
      senderId: messageDomain.senderId.toString(),
      status: messageDomain.status,
      timestamp: messageDomain.timestamp,
      type: messageDomain.type,
      receiversIds: messageDomain.receiversIds.map((id) => id.toString()),
    };
  }

  public static PersistenceToDomain(messagePrisma: MessageDao): Message {
    return Message.create(
      {
        chatId: new UniqueEntityID(messagePrisma.chatId),
        content: messagePrisma.content,
        senderId: new UniqueEntityID(messagePrisma.senderId),
        timestamp: messagePrisma.timestamp,
        type: messagePrisma.type,
        status: messagePrisma.status,
        receiversIds:
          messagePrisma.receiversIds?.map((id) => new UniqueEntityID(id)) ?? [],
      },
      new UniqueEntityID(messagePrisma.id)
    );
  }

  public static ManyDtoToDomain(messagesDto: MessageDto[]): Message[] {
    return messagesDto.map((message) => {
      return this.DtoToDomain(message);
    });
  }

  public static ManyDomainToDto(messagesDomain: Message[]): MessageDto[] {
    return messagesDomain.map((message) => {
      return this.DomainToDto(message);
    });
  }

  public static ManyDomainToPersistence(
    messagesDomain: Message[]
  ): MessagePrisma[] {
    return messagesDomain.map((message) => {
      return this.DomainToPersistence(message);
    });
  }

  public static ManyPersistenceToDomain(
    messagesPrisma: MessageDao[]
  ): Message[] {
    return messagesPrisma.map((message) => {
      return this.PersistenceToDomain(message);
    });
  }
}
