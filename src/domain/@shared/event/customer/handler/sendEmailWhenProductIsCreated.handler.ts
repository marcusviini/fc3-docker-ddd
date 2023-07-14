import EventHandlerInterface from '../../event.handler.interface'
import CustomerCreatedEvent from '../customerCreated.event'

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler(event: CustomerCreatedEvent) {
    console.log('Email send')
  }
}