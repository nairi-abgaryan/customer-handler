import {ICustomer} from '../interfaces';

export class CustomerRepository {
  async createOperation(customer: ICustomer): Promise<ICustomer> {
    throw new Error("Method not implemented.");
  }
  async get(customerId: any): Promise<ICustomer> {
    throw new Error("Method not implemented.");
  }
  async create(customer: ICustomer): Promise<ICustomer> {
    throw new Error("Method not implemented.");
  }
}
