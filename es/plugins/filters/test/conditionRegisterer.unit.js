import { conditions, getCondition, getConditionDescriptor, registerCondition } from 'handsontable/plugins/filters/conditionRegisterer';
describe('registerCondition', function () {
  it('should register condition function under its name', function () {
    var conditionMock = function conditionMock() {};

    expect(conditions.my_condition).not.toBeDefined();
    registerCondition('my_condition', conditionMock, {});
    expect(conditions.my_condition.condition).toBe(conditionMock);
  });
  it('should overwrite condition under the same name', function () {
    var conditionMockOrg = function conditionMockOrg() {};

    var conditionMock = function conditionMock() {};

    conditions.my_condition = conditionMockOrg;
    expect(conditions.my_condition).toBe(conditionMockOrg);
    registerCondition('my_condition', conditionMock, {});
    expect(conditions.my_condition.condition).toBe(conditionMock);
  });
  it('should register condition function with descriptor object', function () {
    var conditionMock = function conditionMock() {};

    registerCondition('my_condition', conditionMock, {
      inputsCount: 3,
      foo: 'bar'
    });
    expect(conditions.my_condition.descriptor.inputsCount).toBe(3);
    expect(conditions.my_condition.descriptor.foo).toBe('bar');
  });
});
describe('getCondition', function () {
  afterEach(function () {
    conditions.my_condition = null;
  });
  it('should return condition as a closure', function () {
    var conditionMock = {
      condition: function condition() {},
      descriptor: {}
    };
    conditions.my_condition = conditionMock;
    var condition = getCondition('my_condition');
    expect(condition instanceof Function).toBe(true);
  });
  it('should throw exception if condition not exists', function () {
    expect(function () {
      getCondition('my_condition');
    }).toThrow();
  });
  it('should return `true`', function () {
    var conditionMock = jasmine.createSpy();
    var dataRow = {
      meta: {
        instance: {}
      },
      value: 'foo'
    };
    conditionMock.and.returnValue(true);
    conditions.my_condition = {
      condition: conditionMock,
      descriptor: {}
    };
    var condition = getCondition('my_condition', 'baz')(dataRow);
    expect(conditionMock).toHaveBeenCalledWith(dataRow, 'baz');
    expect(condition).toBe(true);
  });
});
describe('getConditionDescriptor', function () {
  it('should return condition as a closure', function () {
    conditions.my_condition = {
      condition: function condition() {},
      descriptor: {
        foo: 'bar'
      }
    };
    var descriptor = getConditionDescriptor('my_condition');
    expect(descriptor.foo).toBe('bar');
    expect(descriptor.condition).toBeUndefined();
  });
  it('should throw exception if condition not exists', function () {
    expect(function () {
      getConditionDescriptor('my_condition_foo');
    }).toThrow();
  });
});