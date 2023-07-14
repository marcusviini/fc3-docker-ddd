import { Sequelize } from 'sequelize-typescript'

import Product from '../../src/domain/entity/product'
import ProductModel from '../../src/infrastructure/db/sequelize/model/product.model'
import ProductRepository from '../../src/infrastructure/repository/product.repository'

let sequelize : Sequelize

describe('Product repository tests', () => {
  beforeEach(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([ProductModel])
    return sequelize.sync()
  })
  afterEach(() => sequelize.close())
  it('Should create a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 10)
    await productRepository.create(product)
    const productModel = await ProductModel.findOne({ where: { id: '1' } })
    expect(productModel?.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 10
    })
  })
  it('Should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 10)
    await productRepository.create(product)
    product.changeName('Product 1 updated')
    product.changePrice(20)
    await productRepository.update(product)
    const productModel = await ProductModel.findOne({ where: { id: '1' } })
    expect(productModel?.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1 updated',
      price: 20
    })
  })
  it('Should find a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 10)
    await productRepository.create(product)
    const productFound = await productRepository.find('1')
    expect(productFound).toStrictEqual(product)
  })
  it('Should find all products', async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product('1', 'Product 1', 10)
    const product2 = new Product('2', 'Product 2', 20)
    await productRepository.create(product1)
    await productRepository.create(product2)
    const productsFound = await productRepository.findAll()
    expect(productsFound).toStrictEqual([product1, product2])
  })
})