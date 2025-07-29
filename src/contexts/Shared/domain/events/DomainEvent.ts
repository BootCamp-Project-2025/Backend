/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DomainEvent {
  occurredOn: Date;
  payload: Record<string, any>;
}
