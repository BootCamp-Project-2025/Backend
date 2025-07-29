import { DomainEvent } from "./DomainEvent";

export class ExampleCreatedEvent implements DomainEvent {
  occurredOn = new Date();
  constructor(public payload: { userId: string; email: string }) {}
}
