import { ArgumentNotProvidedException } from "@metanodejs/exceptions";
import { generatePrefixId } from "../../helpers/ids";
import { UniqueEntityID } from "../entities/unique-entity";

type DomainEventMetadata = {
  /** Timestamp when this domain event occurred */
  readonly timestamp: number;
  /** ID for correlation purposes (for Integration Events,logs correlation, etc).
   */
  readonly correlationId?: string;

  /**
   * Causation id used to reconstruct execution order if needed
   */
  readonly causationId?: string;
  /**
   * User ID for debugging and logging purposes
   */
  readonly userId?: string;

  readonly conversationId?: string;
};

export type IDomainEvent<T> = Omit<T, "id" | "_metadata" | "eventName"> & {
  _metadata: DomainEventMetadata;
  aggregateId: UniqueEntityID;
};

export abstract class DomainEvent {
  readonly id: UniqueEntityID;
  readonly aggregateId: UniqueEntityID;
  readonly _metadata: DomainEventMetadata;
  abstract eventName: string;

  constructor(domainEvent: IDomainEvent<unknown>) {
    if (!domainEvent)
      throw new ArgumentNotProvidedException("Domain event props should not be empty");
    if (domainEvent && domainEvent._metadata && !domainEvent._metadata.timestamp)
      throw new ArgumentNotProvidedException(
        "Timestamp should be provided in domain event metadata",
      );

    this.id = new UniqueEntityID(generatePrefixId("de"));
    this.aggregateId = domainEvent.aggregateId;
    this._metadata = {
      correlationId: domainEvent?._metadata?.correlationId,
      causationId: domainEvent?._metadata?.causationId,
      timestamp: domainEvent?._metadata?.timestamp,
      userId: domainEvent?._metadata?.userId,
      conversationId: domainEvent?._metadata?.conversationId,
    };
  }
}
