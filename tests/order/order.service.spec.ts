import Order from '../../src/domain/entity/order'
import Customer from '../../src/domain/entity/customer'
import OrderItem from '../../src/domain/entity/order_item'
import OrderService from '../../src/domain/service/order.service'


describe('Orders service unit tests', () => {
  it('Should place an order', () => {
    const customer = new Customer('1', 'Customer 1')
    const item1 = new OrderItem('1', 'Product 1', 100, '1', 1)
    const order = OrderService.placeOrder(customer, [item1])
    expect(customer.rewardPoints).toBe(50)
    expect(order.total()).toBe(100)
  })
  it('Should get total off all orders', () => {
    const orderItem1 = new OrderItem('1', 'Product 1', 100, '1', 1)
    const orderItem2 = new OrderItem('2', 'Product 2', 20, '2', 2)
    const order1 = new Order('1', 'item 1', [orderItem1])
    const order2 = new Order('2', 'item 2', [orderItem2])
    const total = OrderService.total([order1, order2])
    expect(total).toBe(140)
  })
})
