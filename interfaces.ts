export enum Status {
  active = "active",
  inactive = "inactive"
}

export interface IOutput {
  creatorId: string;
  customerId: string;
}

export interface ICustomerId {
  id: string;
}

interface IMinimal {
  auditFields: string
  name: string
  customerId: ICustomerId
  get?: Function
  isPresent?: Function
}

export interface IContentCreator extends IMinimal{
  creatorId: ICustomerId
}

export interface ICustomer extends IMinimal{
  status: Status
}
