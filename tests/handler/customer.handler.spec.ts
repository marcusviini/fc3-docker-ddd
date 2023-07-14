import Address from '../../src/domain/entity/address'
import Customer from '../../src/domain/entity/customer'
import CustomerCreatedEvent from '../../src/domain/@shared/event/customer/customerCreated.event'
import SendEmailWhenCustomerAddressIsChangedHandler from '../../src/domain/@shared/event/customer/handler/sendEmailWhenCustomerAddressIsChanged.handler'
import SendEmailWhenCustomerIsCreatedHandler from '../../src/domain/@shared/event/customer/handler/sendEmailWhenProductIsCreated.handler'
import SendToCloudWhenCustomerIsCreatedHandler from '../../src/domain/@shared/event/customer/handler/sendToCloudWhenCustomerIsCreated.handler'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let spyLog: any

describe('Customer Handler Unit Tests', () => {
  beforeEach(() => spyLog = jest.spyOn(console, 'log'))
  afterEach(() => spyLog.mockRestore())

  test('Send Email When Customer Is Created Handler', () => {
    const customer = new Customer('1', 'Customer 1')
    const customerCreatedEvent = new CustomerCreatedEvent(customer)
    new SendEmailWhenCustomerIsCreatedHandler().handler(customerCreatedEvent)
    expect(spyLog).toHaveBeenCalledWith('Email send')
  })

  test('Send To Cloud When Customer Is Created Handler', () => {
    const customer = new Customer('1', 'Customer 1')
    const customerCreatedEvent = new CustomerCreatedEvent(customer)
    new SendToCloudWhenCustomerIsCreatedHandler().handler(customerCreatedEvent)
    expect(spyLog).toHaveBeenCalledWith('Enviando para a nuvem')
  })

  test('Send Email When Customer Address Is Changed Handler', () => {
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 123, '13350-250', 'São Paulo')
    customer.changeAddress(address)
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.address.toString(),
    })
    new SendEmailWhenCustomerAddressIsChangedHandler().handler(customerCreatedEvent)
    expect(spyLog).toHaveBeenCalledWith('Endereço do cliente alterado com sucesso')
  })
})