import { sendExampleMsg } from "./contexts/Shared/application/handlers/SendExampleMsg";
import { EventDispatcher } from "./contexts/Shared/domain/events/EventDispatcher";
import { ExampleCreatedEvent } from "./contexts/Shared/domain/events/ExampleCreatedEvent";
import { IndexResourceEvent } from "./contexts/Shared/domain/events/IndexResourceEvent";
import { indexResourceHandler } from "./contexts/Shared/application/handlers/IndexResourceHandler";
import { DeleteResourceEvent } from "./contexts/Shared/domain/events/DeleteResourceEvent";
import { deleteResourceHandler } from "./contexts/Shared/application/handlers/DeleteResourceHandler";

export const globalEventDispatcher = new EventDispatcher();

globalEventDispatcher.register(ExampleCreatedEvent.name, sendExampleMsg);
globalEventDispatcher.register(IndexResourceEvent.name, indexResourceHandler);
globalEventDispatcher.register(DeleteResourceEvent.name, deleteResourceHandler);

// Example usage of the event dispatcher
// const event = new ExampleCreatedEvent({
//   userId: "id",
//   email: "email@example.com",
// });
// globalEventDispatcher.dispatch(event);
