import { RequestDto } from "@/contexts/CoreContext/domain/interfaces/dtos/RequestDto";
import { DomainEvent } from "./DomainEvent";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";

export class IndexResourceEvent implements DomainEvent {
  occurredOn = new Date();
  constructor(
    public payload: { resource: string; resourceDto: RequestDto | CourseDTO }
  ) {}
}
