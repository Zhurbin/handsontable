"use strict";

var _logicalOperationRegisterer = require("handsontable/plugins/filters/logicalOperationRegisterer");

describe('registerOperation', function () {
  it('should register operation function under its name', function () {
    var operationMock = function operationMock() {};

    expect(_logicalOperationRegisterer.operations.xor).not.toBeDefined();
    (0, _logicalOperationRegisterer.registerOperation)('xor', 'XOR', operationMock);
    expect(_logicalOperationRegisterer.operations.xor).toBeDefined();
    expect(_logicalOperationRegisterer.operations.xor.func).toBe(operationMock);
  });
});
describe('getOperationFunc', function () {
  afterEach(function () {
    _logicalOperationRegisterer.operations.xor = null;
  });
  it('should return operation result function as a closure', function () {
    var operationMock = function operationMock() {
      return true;
    };

    _logicalOperationRegisterer.operations.xor = {
      func: operationMock,
      name: 'XOR'
    };
    var func = (0, _logicalOperationRegisterer.getOperationFunc)('xor');
    expect(func instanceof Function).toBe(true);
  });
  it('should throw exception if operation doesn\'t exists', function () {
    expect(function () {
      (0, _logicalOperationRegisterer.getOperationFunc)('xor');
    }).toThrow();
  });
  it('should return `true`', function () {
    var operationMock = jasmine.createSpy();
    var conditionsMock = [{}, {}];
    var argsMock = 'hello world';
    operationMock.and.returnValue(true);
    _logicalOperationRegisterer.operations.xor = {
      func: operationMock,
      name: 'XOR'
    };
    var result = (0, _logicalOperationRegisterer.getOperationFunc)('xor')(conditionsMock, argsMock);
    expect(operationMock).toHaveBeenCalledWith(conditionsMock, argsMock);
    expect(result).toBe(true);
  });
});