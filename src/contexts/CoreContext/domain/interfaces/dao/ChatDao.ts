import {
  Chat as ChatPrisma,
  Message as MessagePrisma,
} from "@/generated/prisma";

export interface ChatDao extends ChatPrisma {
  messages: MessagePrisma[];
  participantsIds: string[];
}
