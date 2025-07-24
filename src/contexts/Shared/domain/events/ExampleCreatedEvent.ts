import { DomainEvent } from "./DomainEvent";

export class ExampleCreatedEvent implements DomainEvent {
  name = "ExampleCreated";
  occurredOn = new Date();
  constructor(public payload: { userId: string; email: string }) {}
}
