import { Chat } from "../domain/aggregates/Chat";
import { Chat as ChatPrisma } from "@/generated/prisma";
import { ChatDao } from "../domain/interfaces/dao/ChatDao";
import { ChatDto } from "../domain/interfaces/dtos/IChatDto";
import { MessageMapper } from "./MessageMapper";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ChatName } from "../domain/valueObjects/ChatName";

export class ChatMapper {
  public static DtoToDomain(chatDto: ChatDto): Chat {
    return Chat.create(
      {
        messages: MessageMapper.ManyDtoToDomain(chatDto.messages),
        participantsIds: chatDto.participantsIds.map(
          (id) => new UniqueEntityID(id)
        ),
        createdAt: chatDto.createdAt,
        name: ChatName.create(chatDto.name ?? ""),
        status: chatDto.status,
      },
      new UniqueEntityID(chatDto.id)
    );
  }
  public static DomainToDto(chatDomain: Chat): ChatDto {
    return {
      id: chatDomain.id.toString(),
      name: chatDomain.chatName?.value,
      messages: MessageMapper.ManyDomainToDto(chatDomain.messages),
      participantsIds: chatDomain.participantsIds.map((id) => id.toString()),
      status: chatDomain.status ?? "ACTIVE",
      createdAt: chatDomain.createdAt,
    };
  }

  public static DomainToPersistence(chatDomain: Chat): ChatDao {
    return {
      id: chatDomain.id.toString(),
      createdAt: chatDomain.createdAt ?? new Date(),
      name: chatDomain.chatName?.value ?? "",
      status: chatDomain.status ?? "ACTIVE",
      participantsIds: chatDomain.participantsIds.map((id) => id.toString()),
      messages: MessageMapper.ManyDomainToPersistence(chatDomain.messages),
    };
  }

  public static PersistenceToDomain(chatDao: ChatDao): Chat {
    return Chat.create(
      {
        name: ChatName.create(chatDao.name ?? ""),
        messages: MessageMapper.ManyPersistenceToDomain(chatDao.messages),
        participantsIds: chatDao.participantsIds.map(
          (id) => new UniqueEntityID(id)
        ),
        createdAt: chatDao.createdAt,
        status: chatDao.status,
      },
      new UniqueEntityID(chatDao.id)
    );
  }

  public static ManyDtoToDomain(chatsDto: ChatDto[]): Chat[] {
    return chatsDto.map((chat) => {
      return this.DtoToDomain(chat);
    });
  }

  public static ManyDomainToDto(chatsDomain: Chat[]): ChatDto[] {
    return chatsDomain.map((chat) => {
      return this.DomainToDto(chat);
    });
  }

  public static ManyDomainToPersistence(chatsDomain: Chat[]): ChatPrisma[] {
    return chatsDomain.map((chat) => {
      return this.DomainToPersistence(chat);
    });
  }

  public static ManyPersistenceToDomain(chatsDao: ChatDao[]): Chat[] {
    return chatsDao.map((chat) => {
      return this.PersistenceToDomain(chat);
    });
  }
}
