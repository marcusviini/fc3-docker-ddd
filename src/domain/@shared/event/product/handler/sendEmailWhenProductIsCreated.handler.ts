import EventHandlerInterface from '../../event.handler.interface'
import ProductCreatedEvent from '../productCreated.event'

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handler(event: ProductCreatedEvent): void {
    console.log(`Send email when product is created: ${event.eventData}`)
  }
}