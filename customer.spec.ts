const customerRepo =  {
  createOperation: () => { return 'Create customer operation created'},
  get: () => { return {
    isPresent: () => {return false},
    creatorId: {id : 3 }
  } }
};
const creatorRepo =  {
  createOperation: () => { return 'Create Content creator operation created'},
  getByCustomer: () => { return {
    isPresent: () => {return false},
    creatorId: {id : 3 }
  } }
};

const transactionRepo =  {
  transact: () => { return 'Operations are executed'},
};

describe('CreateOrUpdateCustomerHandler', () => {
  const handler = new (require('./customer')).CreateOrUpdateCustomerHandler(creatorRepo, customerRepo);
  
  test('should create customer create operation', async () => {
    expect(await handler.createCustomerOperation({
      customerId: 3,
      creatorId: 3,
    })).toBe('Create customer operation created');
  })
  
  test('should creator create operation', async () => {
    expect(await handler.createCustomerOperation({
      customerId: 3,
      creatorId: 3,
    })).toBe('Create customer operation created');
  })
  
  test('should call invoke and create customer and creator', async () => {
    const handler = new (require('./customer')).CreateOrUpdateCustomerHandler(creatorRepo, customerRepo, transactionRepo);
  
    expect(await handler.invoke({
      customerId: 4,
      creatorId: 3,
    })).toStrictEqual({
      customerId: 4,
      creatorId: 3,
    });
  })
})
