import EventDispatcherInterface from './event.dispatcher.interface'
import eventHandlerInterface from './event.handler.interface'
import eventInterface from './event.interface'
import EventHandlerInterface from './event.handler.interface'

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  get getEventHandlers(): {  [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers
  }

  notify(event: eventInterface): void {
    const eventName = event.constructor.name
    if (this.eventHandlers[eventName]) this.eventHandlers[eventName].forEach(eventHandler => eventHandler.handler(event))
  }

  register(
    eventName: string,
    eventHandler: eventHandlerInterface<eventInterface>
  ): void {
    if (!this.eventHandlers[eventName]) this.eventHandlers[eventName] = []
    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister(
    eventName: string,
    eventHandler: eventHandlerInterface<eventInterface>
  ): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler)
      if (index !== -1) this.eventHandlers[eventName].splice(index, 1)
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {}
  }
}