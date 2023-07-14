import Customer from '../entity/customer'
import RepositoryInterface from '../@shared/repository/repository.Interface'

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}