import Product from '../../src/domain/entity/product'
import ProductService from '../../src/domain/service/product.service'

describe('Products service unit tests', () => {
  it('Should change price of all products', () => {
    const product1 = new Product('1', 'Product 1', 100)
    const product2 = new Product('2', 'Product 2', 20)
    const product3 = new Product('3', 'Product 3', 50)
    const products = [product1, product2, product3]
    ProductService.increasePrice(products, 10)
    expect(product1.price).toBe(110)
    expect(product2.price).toBe(22)
    expect(product3.price).toBe(55)
  })
})
