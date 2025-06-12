import { UserRole } from "@/generated/prisma";

export type UserDao = {
  freelancerProfile: {
    id: string;
    about: string;
    userId: string;
  } | null;
  clientProfile: {
    id: string;
    userId: string;
  } | null;
  id: string;
  userName: string;
  userEmail: string;
  roles: UserRole[];
  createdAt: Date;
};
