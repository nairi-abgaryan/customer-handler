/**
 * This is a simplified version of one of our function handlers.
 * For a given input, this function should either:
 *   1. Create a ICustomer and a IContentCreator records
 *   2. Or create a ICustomer record, and do not create a IContentCreator record because one already exists
 *   3. Or not create a ICustomer record because one already exists, and create a IContentCreator record
 *   4. Or don't create any records because both already exist
 *
 * The code works, but there are many issues.
 * Can you please take a crack at it to simplify it, avoid code duplication and improve runtime performance?
 * And also create 1-2 unit tests to show us how would you test this class?
 *
 * Additional information:
 *   - ContentCreatorRepository::createOperation and CustomerRepository::createOperation both return an
 *     instance of BatchOperationType
 *   - RepositoryDelegateTransaction::transact method takes BatchOperationType[] as its input
 */

import {CustomerRepository} from './repository/customer.repository';
import {ContentCreatorRepository} from './repository/creator.repository';
import {IContentCreator, ICustomer, IOutput, Status} from './interfaces';

/** Imported CustomerId */
class ValidationError{
  // must be extended from Error or HttpError class
  public constructor(public readonly error: string) {}
}

/** Imported CustomerId */
class CustomerId {
  public constructor(public readonly id: string) {}
}

export class CreateOrUpdateCustomerHandler {
  public constructor(
    private readonly contentCreatorRepository: ContentCreatorRepository,
    private readonly customerRepository: CustomerRepository,
  ) {
  }
  
  public async invoke(event: any): Promise<IOutput> {
    const input = CreateOrUpdateCustomerHandler.extractInput(event);
    
    let customer = await this.customerRepository.get(input.customerId); // just get customer
    let contentCreator = await this.contentCreatorRepository.getByCustomer(input.customerId);
    /**
     * As I understand we can make this without operations just calling
     * repository.create(object); inside createCustomer function
     * I choose this solution because I think transaction will be executed as unit
     */
    // check if there is no customer create Customer operation and push it in operations array
    if(!customer.isPresent()) customer = await this.createCustomer(customer);
    // check if there is no content creator create ContentCreator operation and push it in operations array
    if(!contentCreator.isPresent()) contentCreator = await this.createContentCreator(customer);
    
    CreateOrUpdateCustomerHandler.validateExistingCustomer(customer);
  
    return {
      creatorId: contentCreator.creatorId.id,
      customerId: input.customerId.id,
    }
  }
  
  private createContentCreator(customer: ICustomer): IContentCreator {
    const contentCreator: IContentCreator = {
      auditFields: 'audit fields',
      creatorId: new CustomerId('uuid'),
      customerId: customer.customerId,
      name: customer.name,
    };
    
    return this.contentCreatorRepository.create(contentCreator);
  }
  
  // We can just call this.customerRepository.create(customer) function which will save and return data, but currently
  // changing it for using transaction like executing it as one unit
  private async createCustomer(input: any) {
    const customer: ICustomer = {
      auditFields: 'audit fields',
      customerId: input.customerId,
      name: input.customerName,
      status: Status.active,
    };
    
    return this.customerRepository.create(customer)
  }
  
  private static extractInput(event: any): any {
    return {
      // There are a lot more attributes here that have been removed for simplification purposes
      customerId: new CustomerId(event.customerId),
      customerName: event.customerName,
    };
  }
  
  private static validateExistingCustomer(customer: ICustomer) {
    if (customer.status === Status.inactive) {
      throw new ValidationError(`Existing customer ${customer.customerId} is currently inactive`);
    }
  }
}
