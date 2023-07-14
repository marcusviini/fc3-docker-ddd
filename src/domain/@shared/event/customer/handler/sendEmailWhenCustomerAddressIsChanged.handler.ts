import EventHandlerInterface from '../../event.handler.interface'
import CustomerChangedAddressEvent from '../customerChangedAddress.event'


export default class SendEmailWhenCustomerAddressIsChangedHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler(event: CustomerChangedAddressEvent) {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`)
  }
}