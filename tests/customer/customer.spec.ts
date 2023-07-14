import Address from '../../src/domain/entity/address'
import Customer from '../../src/domain/entity/customer'

describe('Customer unit tests', () => {
  it('Should throw error when id is empty', () => {
    expect(() => new Customer('', 'John Doe')).toThrowError('Id is required')
  })
  it('Should throw error when name is empty', () => {
    expect(() => new Customer('123', '')).toThrowError('Name is required')
  })
  it('Should change name', () => {
    const customer = new Customer('123', 'John Doe')
    customer.changeName('Jane Doe')
    expect(customer.name).toBe('Jane Doe')
  })
  it('Should activate customer', () => {
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 123, '13350-250', 'São Paulo')
    customer.changeAddress(address)
    customer.activate()
    expect(customer.isActive()).toBe(true)
  })
  it('Should deactivate customer', () => {
    const costumer = new Customer('1', 'Costumer 1')
    costumer.deactivate()
    expect(costumer.isActive()).toBe(false)
  })
  it('Should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const costumer = new Customer('1', 'Costumer 1')
      costumer.activate()
      expect(costumer.isActive()).toBe(true)
    }).toThrowError('Address is mandatory to activate a customer')
  })
  it('Should add reward points', () => {
    const costumer = new Customer('1', 'Costumer 1')
    const initialRewardPoints = costumer.rewardPoints
    costumer.addRewardPoints(10)
    costumer.addRewardPoints(1)
    expect(initialRewardPoints).toBe(0)
    expect(costumer.rewardPoints).toBe(11)
  })
})
