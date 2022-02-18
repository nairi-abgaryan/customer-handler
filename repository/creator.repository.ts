import {IContentCreator} from '../interfaces';

export class ContentCreatorRepository {
  create(contentCreator: IContentCreator): IContentCreator {
      throw new Error('Method not implemented.');
  }
  createOperation(contentCreator: IContentCreator): IContentCreator {
    throw new Error("Method not implemented.");
  }
  
  getByCustomer(customerId: any): IContentCreator {
    return
  }
}
