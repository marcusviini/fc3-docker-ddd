import OrderItemModel from '../db/sequelize/model/order_item.model'
import Order from '../../domain/entity/order'
import OrderItem from '../../domain/entity/order_item'
import OrderModel from '../db/sequelize/model/order.model'
import OrderRepositoryInterface from '../../domain/repository/order.repository.interface'

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity
        }))
      },
      { include: [{ model: OrderItemModel }] }
    )
  }

  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize
    await sequelize.transaction(async transaction => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction
      })
      const items = entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id
      }))
      await OrderItemModel.bulkCreate(items, { transaction })
      await OrderModel.update(
        { customer_id: entity.customerId, total: entity.total() },
        { where: { id: entity.id }, transaction }
      )
    })
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      rejectOnEmpty: true,
      include: ['items']
    }).catch(() => { throw new Error('Order not found')})
    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
    )
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ['items'] })
    return orderModels.map( orderModel => new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
      )
    )
  }
}