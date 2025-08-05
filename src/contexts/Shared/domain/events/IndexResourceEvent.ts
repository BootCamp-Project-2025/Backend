import { RequestDto } from "@/contexts/CoreContext/domain/interfaces/dtos/RequestDto";
import { DomainEvent } from "./DomainEvent";
import { CourseIndex } from "@/contexts/LearningContext/domain/dtos/CourseIndex";

export class IndexResourceEvent implements DomainEvent {
  occurredOn = new Date();
  constructor(
    public payload: { resource: string; resourceDto: RequestDto | CourseIndex }
  ) {}
}
