import { DomainEvent } from "./DomainEvent";

export class DeleteResourceEvent implements DomainEvent {
  occurredOn = new Date();
  constructor(public payload: { resource: string; resourceId: string }) {}
}
