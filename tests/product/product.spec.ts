import Product from '../../src/domain/entity/product'

describe('Product unit tests', () => {
  it('Should throw error when id is empty', () =>
    expect(() => new Product('', 'Product 1', 10)).toThrowError('Id is required'))
  it('Should throw error when name is empty', () =>
    expect(() => new Product('1', '', 10)).toThrowError('Name is required'))
  it('Should throw error when price is empty', () =>
    // eslint-disable-next-line
    // @ts-ignore
    expect(() => new Product('1', 'name', null)).toThrowError('Price is required'))
  it('Should throw error when price is less than zero', () =>
    expect(() => new Product('1', 'name', -1)).toThrowError('Price must be greater than zero'))
  it('Should change name', () => {
    const product = new Product('1', 'Product 1', 10)
    product.changeName('Product 2')
    expect(product.name).toBe('Product 2')
  })
  it('Should change price', () => {
    const product = new Product('1', 'Product 1', 10)
    product.changePrice(200)
    expect(product.price).toBe(200)
  })
})
