import Address from '../../domain/entity/address'
import Customer from '../../domain/entity/customer'
import CustomerModel from '../db/sequelize/model/customer.model'
import CustomerRepositoryInterface from '../../domain/repository/customer.repository.interface'

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipCode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipCode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints
      },
      { where: { id: entity.id } }
    )
  }

  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ 
      where: { id },
      rejectOnEmpty: true
    }).catch(() => { throw new Error('Customer not found') })
    const customer = new Customer(id, customerModel.name)
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipCode,
      customerModel.city
    )
    customer.changeAddress(address)
    return customer
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll()
    const customers = customerModels.map(customerM => {
      const customer = new Customer(customerM.id, customerM.name)
      customer.addRewardPoints(customerM.rewardPoints)
      const address = new Address(customerM.street, customerM.number, customerM.zipCode, customerM.city)
      customer.changeAddress(address)
      if (customerM.active) customer.activate()
      return customer
    })
    return customers
  }
}