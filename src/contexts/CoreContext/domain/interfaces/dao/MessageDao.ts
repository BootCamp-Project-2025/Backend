import { Message } from "@/generated/prisma";

export interface MessageDao extends Message {
  receiversIds?: string[];
}
