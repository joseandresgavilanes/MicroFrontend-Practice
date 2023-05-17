export interface Payload {
  [paramName: string]: any
}

/**
 * Subscriber
 *
 * @export
 * @interface Subscriber
 * @author bcueva
 */
export interface Subscriber {
  (payload?: Payload): void;
}

/**
 * Publish - Subscribe pattern
 *
 * @export
 * @class PublishSubscribe
 * @template E
 * @author bcueva
 */
export class PublishSubscribe<E> {
  private _subscribers!: Map<E, Subscriber[]>;

  /**
   * Creates an instance of PublishSubscribe.
   * @memberof PublishSubscribe
   */
  constructor() {
    this._subscribers = new Map();
  }

  /**
   * Subscribe to event
   *
   * @param {E} eventType Event type
   * @param {Subscriber} subscriber Function to subscribe
   * @memberof PublishSubscribe
   */
  subscribe(eventType: E, subscriber: Subscriber): void {
    if (typeof subscriber !== "function") {
      throw new Error(
        `${typeof subscriber} is not a valid argument for subscribe method, expected a function instead`
      );
    }

    const subscribers = this._subscribers.get(eventType) ?? [];
    subscribers.push(subscriber);
    this._subscribers.set(eventType, subscribers);
  }


  /**
   * Unsubscribe to event
   *
   * @param {E} eventType Event type
   * @param {Subscriber} subscriber Function to unsubscribe
   * @memberof PublishSubscribe
   */
  unsubscribe(eventType: E, subscriber: Subscriber): void {
    if (typeof subscriber !== "function") {
      throw new Error(
        `${typeof subscriber} is not a valid argument for unsubscribe method, expected a function instead`
      );
    }

    if (this._subscribers.has(eventType)) {
      this._subscribers.set(
        eventType,
        (this._subscribers.get(eventType) as Subscriber[]).filter(
          (sub) => sub !== subscriber
        )
      );
    }
  }

  /**
   * Publish event
   *
   * @template T
   * @param {E} eventType Event type
   * @param {(T | Payload)} payload Payload
   * @memberof PublishSubscribe
   */
  publish<T>(eventType: E, payload?: any): void {
    if (this._subscribers.has(eventType)) {
      (this._subscribers.get(eventType) as Subscriber[]).forEach((subscriber) =>
        subscriber(payload)
      );
    }
  }
}
