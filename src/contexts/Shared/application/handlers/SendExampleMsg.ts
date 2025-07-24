import { DomainEvent } from "../../domain/events/DomainEvent";
import { ExampleCreatedEvent } from "../../domain/events/ExampleCreatedEvent";

export const sendExampleMsg = (event: DomainEvent): void => {
  const exampleEvent = event as ExampleCreatedEvent;
  console.log(
    `Sending example message to user ${exampleEvent.payload.userId} at email ${exampleEvent.payload.email}, event occurred on ${exampleEvent.occurredOn}`
  );
};
