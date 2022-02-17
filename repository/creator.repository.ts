import {IContentCreator} from '../interfaces';

export class ContentCreatorRepository {
  createOperation(contentCreator: IContentCreator): IContentCreator {
    throw new Error("Method not implemented.");
  }
  
  getByCustomer(customerId: any): IContentCreator {
    return
  }
}
