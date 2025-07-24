import { sendExampleMsg } from "./contexts/Shared/application/handlers/SendExampleMsg";
import { EventDispatcher } from "./contexts/Shared/domain/events/EventDispatcher";

const globalEventDispatcher = new EventDispatcher();

globalEventDispatcher.register("ExampleCreated", sendExampleMsg);

// Example usage of the event dispatcher
// const event = new ExampleCreatedEvent({
//   userId: "id",
//   email: "email@example.com",
// });
// globalEventDispatcher.dispatch(event);
