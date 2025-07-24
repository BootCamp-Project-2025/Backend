import { DomainEvent } from "./DomainEvent";
type EventHandler = (event: DomainEvent) => void;

export class EventDispatcher {
  private handlers: Map<string, EventHandler[]> = new Map();

  register(eventName: string, handler: EventHandler) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler);
  }

  dispatch(event: DomainEvent) {
    const handlers = this.handlers.get(event.name) || [];
    for (const handler of handlers) {
      handler(event);
    }
  }
}
