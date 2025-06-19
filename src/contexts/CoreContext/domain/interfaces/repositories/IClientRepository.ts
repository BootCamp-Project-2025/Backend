import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Client } from "../../aggregates/Client";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IClientRepository extends IRepository<Client> {}
