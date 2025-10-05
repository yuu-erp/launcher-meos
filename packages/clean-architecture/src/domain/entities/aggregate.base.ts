import { LoggerPort } from "../../infrastructure/logger";
import { AsyncEventBus, DomainEvent } from "../events";
import { Entity } from "./entity.base";

export abstract class AggregateRoot<Props> extends Entity<Props> {
  // Private field để lưu domain events
  #domainEvents: DomainEvent[] = [];

  get domainEvents(): readonly DomainEvent[] {
    return this.#domainEvents;
  }

  protected addEvent(event: DomainEvent | DomainEvent[]): void {
    if (Array.isArray(event)) {
      this.#domainEvents.push(...event);
    } else {
      this.#domainEvents.push(event);
    }
  }

  clearEvents(): void {
    this.#domainEvents = [];
  }

  /**
   * Publish tất cả domain events qua AsyncEventBus
   * - Logger để debug
   * - await cho từng handler async
   */
  async publishEvents(logger: LoggerPort, emitter: AsyncEventBus) {
    for (const event of this.#domainEvents) {
      // Dùng property eventName thay vì constructor.name
      const eventName = event.eventName;
      console.log(eventName);
      logger.debug(
        `[RequestID] "${eventName}" event published for aggregate ${this.constructor.name} : ${this.id}`,
      );
      console.log(
        `[RequestID] "${eventName}" event published for aggregate ${this.constructor.name} : ${this.id}`,
      );

      if (eventName) {
        emitter.emit(eventName, event as any);
      } else {
        logger.debug(`[AggregateRoot] Event "${eventName}" không có eventName, bỏ qua.`);
      }
    }

    this.clearEvents();
  }
}
