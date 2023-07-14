import { Sequelize } from 'sequelize-typescript'

import Order from '../../src/domain/entity/order'
import Product from '../../src/domain/entity/product'
import Address from '../../src/domain/entity/address'
import Customer from '../../src/domain/entity/customer'
import OrderItem from '../../src/domain/entity/order_item'

import OrderItemModel from '../../src/infrastructure/db/sequelize/model/order_item.model'
import OrderModel from '../../src/infrastructure/db/sequelize/model/order.model'
import ProductModel from '../../src/infrastructure/db/sequelize/model/product.model'
import CustomerModel from '../../src/infrastructure/db/sequelize/model/customer.model'

import OrderRepository from '../../src/infrastructure/repository/order.repository'
import ProductRepository from '../../src/infrastructure/repository/product.repository'
import CustomerRepository from '../../src/infrastructure/repository/customer.repository'

describe('Order repository test', () => {
  let sequelize: Sequelize
  it('Should true be true', () => expect(true).toBe(true))
  beforeEach(async () => {
    sequelize = await new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()
  })
  afterEach(() => sequelize.close())
  it('Should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipCode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)
    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const order = new Order('123', '123', [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })
    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: orderItem.productId
        }
      ]
    })
  })
  it('Should update a product', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipCode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)
    const orderItem1 = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const order = new Order('123', '123', [orderItem1])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      2
    )
    order.items.push(orderItem2)
    await orderRepository.update(order)
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })
    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: order.items.map((orderItem) => ({
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
        order_id: order.id,
        product_id: orderItem.productId
      }))
    })
  })
  it('Should find a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('456', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipCode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const productRepository = new ProductRepository()
    const product = new Product('456', 'Product 1', 10)
    await productRepository.create(product)
    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const order = new Order('456', customer.id, [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    const orderFound = await orderRepository.find(order.id)
    expect(orderFound).toStrictEqual(order)
  })
  it('Should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('456', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipCode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const productRepository = new ProductRepository()
    const product = new Product('456', 'Product 1', 10)
    await productRepository.create(product)
    const orderItem1 = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const order1 = new Order('123', customer.id, [orderItem1])
    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      2
    )
    const order2 = new Order('456', customer.id, [orderItem2])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order1)
    await orderRepository.create(order2)
    const foundOrders = await orderRepository.findAll()
    const orders = [order1, order2]
    expect(foundOrders).toEqual(orders)
  })
})