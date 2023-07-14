import Product from '../entity/product'
import RepositoryInterface from '../@shared/repository/repository.Interface'

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}