import Order from '../../src/domain/entity/order'
import OrderItem from '../../src/domain/entity/order_item'

describe('Order unit tests', () => {
  it('Should throw error when id is empty', () => {
    expect(() => new Order('', '123', [])).toThrowError('Id is required')
  })
  it('Should throw error when customerId is empty', () => {
    expect(() => new Order('123', '', [])).toThrowError('CustomerId is required')
  })
  it('Should throw error when items is empty', () => {
    expect(() => new Order('123', '123', [])).toThrowError('Items is required')
  })
  it('Should calculate total', () => {
    const item1 = new OrderItem('1', 'item 1', 100, '1', 1)
    const item2 = new OrderItem('2', 'item 2', 200, '2', 2)
    const order = new Order('o1', 'c1', [item1])
    const total = order.total()
    const order2 = new Order('o1', 'c1', [item1, item2])
    const total2 = order2.total()
    expect(total).toBe(100)
    expect(total2).toBe(500)
  })
  it('Should throw error if the item qtd is less or equal zero', () => {
    expect(() => {
      const item1 = new OrderItem('1', 'item 1', 100, '1', 0)
      new Order('o1', 'c1', [item1])
    }).toThrowError('Quantity must be greater than zero')
  })
})
