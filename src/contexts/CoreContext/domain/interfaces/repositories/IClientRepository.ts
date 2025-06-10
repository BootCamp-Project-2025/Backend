import { IRepository } from "@/contexts/Shared/Domain/repository/IRepository";
import { Client } from "../../entities/Client";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IClientRepository extends IRepository<Client> {}
