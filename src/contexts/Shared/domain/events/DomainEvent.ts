/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DomainEvent {
  name: string;
  occurredOn: Date;
  payload: Record<string, any>;
}
