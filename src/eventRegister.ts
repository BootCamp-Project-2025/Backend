import { sendExampleMsg } from "./contexts/Shared/application/handlers/SendExampleMsg";
import { EventDispatcher } from "./contexts/Shared/domain/events/EventDispatcher";
import { ExampleCreatedEvent } from "./contexts/Shared/domain/events/ExampleCreatedEvent";
import { IndexResourceEvent } from "./contexts/Shared/domain/events/IndexResourceEvent";
import { indexResourceHandler } from "./contexts/Shared/application/handlers/IndexResourceHandler";

export const globalEventDispatcher = new EventDispatcher();

globalEventDispatcher.register(ExampleCreatedEvent.name, sendExampleMsg);
globalEventDispatcher.register(IndexResourceEvent.name, indexResourceHandler);

// Example usage of the event dispatcher
// const event = new ExampleCreatedEvent({
//   userId: "id",
//   email: "email@example.com",
// });
// globalEventDispatcher.dispatch(event);
