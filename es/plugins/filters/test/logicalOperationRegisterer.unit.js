import { operations, registerOperation, getOperationFunc } from 'handsontable/plugins/filters/logicalOperationRegisterer';
describe('registerOperation', function () {
  it('should register operation function under its name', function () {
    var operationMock = function operationMock() {};

    expect(operations.xor).not.toBeDefined();
    registerOperation('xor', 'XOR', operationMock);
    expect(operations.xor).toBeDefined();
    expect(operations.xor.func).toBe(operationMock);
  });
});
describe('getOperationFunc', function () {
  afterEach(function () {
    operations.xor = null;
  });
  it('should return operation result function as a closure', function () {
    var operationMock = function operationMock() {
      return true;
    };

    operations.xor = {
      func: operationMock,
      name: 'XOR'
    };
    var func = getOperationFunc('xor');
    expect(func instanceof Function).toBe(true);
  });
  it('should throw exception if operation doesn\'t exists', function () {
    expect(function () {
      getOperationFunc('xor');
    }).toThrow();
  });
  it('should return `true`', function () {
    var operationMock = jasmine.createSpy();
    var conditionsMock = [{}, {}];
    var argsMock = 'hello world';
    operationMock.and.returnValue(true);
    operations.xor = {
      func: operationMock,
      name: 'XOR'
    };
    var result = getOperationFunc('xor')(conditionsMock, argsMock);
    expect(operationMock).toHaveBeenCalledWith(conditionsMock, argsMock);
    expect(result).toBe(true);
  });
});