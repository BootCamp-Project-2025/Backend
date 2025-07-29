import { sendExampleMsg } from "./contexts/Shared/application/handlers/SendExampleMsg";
import { EventDispatcher } from "./contexts/Shared/domain/events/EventDispatcher";
import { ExampleCreatedEvent } from "./contexts/Shared/domain/events/ExampleCreatedEvent";

const globalEventDispatcher = new EventDispatcher();

globalEventDispatcher.register(ExampleCreatedEvent.name, sendExampleMsg);

// Example usage of the event dispatcher
// const event = new ExampleCreatedEvent({
//   userId: "id",
//   email: "email@example.com",
// });
// globalEventDispatcher.dispatch(event);
