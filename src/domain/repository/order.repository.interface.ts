import Order from '../entity/order'
import RepositoryInterface from '../@shared/repository/repository.Interface'

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}