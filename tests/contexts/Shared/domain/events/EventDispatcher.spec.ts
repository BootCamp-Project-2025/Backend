import { EventDispatcher } from "@/contexts/Shared/domain/events/EventDispatcher";
import { ExampleCreatedEvent } from "@/contexts/Shared/domain/events/ExampleCreatedEvent";
import "reflect-metadata";

describe("EventDispatcher", () => {
  it("should call registered handler when event is dispatched", async () => {
    const dispatcher = new EventDispatcher();
    const mockHandler = jest.fn();

    dispatcher.register(ExampleCreatedEvent.name, mockHandler);

    const event = new ExampleCreatedEvent({
      userId: "456",
      email: "email@example.com",
    });

    await dispatcher.dispatch(event);

    expect(mockHandler).toHaveBeenCalledWith(event);
  });
});
