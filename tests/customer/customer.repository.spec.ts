import { Sequelize } from 'sequelize-typescript'

import Address from '../../src/domain/entity/address'
import Customer from '../../src/domain/entity/customer'
import CustomerModel from '../../src/infrastructure/db/sequelize/model/customer.model'
import CustomerRepository from '../../src/infrastructure/repository/customer.repository'

let sequelize: Sequelize

describe('Customer repository test', () => {
  beforeEach(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([CustomerModel])
    return sequelize.sync()
  })
  afterEach(() => sequelize.close())
  it('Should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipCode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })
    expect(customerModel?.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipCode: address.zip,
      city: address.city,
    })
  })

  it('Should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipCode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)
    customer.changeName('Customer 2')
    await customerRepository.update(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })
    expect(customerModel?.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipCode: address.zip,
      city: address.city,
    })
  })

  it('Should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipCode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const customerResult = await customerRepository.find(customer.id)
    expect(customer).toStrictEqual(customerResult)
  })

  it('Should throw an error when customer is not found', () => {
    const customerRepository = new CustomerRepository()
    expect(async () => {
      await customerRepository.find('invalid customer')
    }).rejects.toThrow('Customer not found')
  })

  it('Should find all customers', async () => {
    const customerRepository = new CustomerRepository()
    const customer1 = new Customer('123', 'Customer 1')
    const address1 = new Address('Street 1', 1, 'zipCode 1', 'City 1')
    customer1.changeAddress(address1)
    customer1.addRewardPoints(10)
    customer1.activate()
    const customer2 = new Customer('456', 'Customer 2')
    const address2 = new Address('Street 2', 2, 'zipCode 2', 'City 2')
    customer2.changeAddress(address2)
    customer2.addRewardPoints(20)
    await customerRepository.create(customer1)
    await customerRepository.create(customer2)
    const customers = await customerRepository.findAll()
    expect(customers).toHaveLength(2)
    expect(customers).toContainEqual(customer1)
    expect(customers).toContainEqual(customer2)
  })
})