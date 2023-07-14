import EventHandlerInterface from '../../event.handler.interface'
import CustomerCreatedEvent from '../customerCreated.event'


export default class SendEmailWhenCustomerAddressIsChangedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler(event: CustomerCreatedEvent) {
    console.log('Endereço do cliente alterado com sucesso')
  }
}