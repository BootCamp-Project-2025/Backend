/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Education } from "../../entities/Education";

export interface IEducationRepository extends IRepository<Education> {}
