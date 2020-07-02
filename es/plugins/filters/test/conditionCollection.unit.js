import ConditionCollection from 'handsontable/plugins/filters/conditionCollection';
import { conditions } from 'handsontable/plugins/filters/conditionRegisterer';
import { OPERATION_AND, OPERATION_OR } from 'handsontable/plugins/filters/constants';
import { operations } from 'handsontable/plugins/filters/logicalOperationRegisterer';
describe('ConditionCollection', function () {
  it('should be initialized and accessible from the plugin', function () {
    expect(ConditionCollection).toBeDefined();
  });
  it('should create empty bucket for conditions, columnTypes and empty orderStack', function () {
    var conditionCollection = new ConditionCollection();
    expect(conditionCollection.conditions).toEqual(jasmine.any(Object));
    expect(Object.keys(conditionCollection.conditions)).toEqual(Object.keys(operations));
    expect(conditionCollection.orderStack).toEqual(jasmine.any(Array));
    expect(conditionCollection.columnTypes).toEqual(jasmine.any(Object));
  });
  describe('isEmpty', function () {
    it('should return `true` when order stack is equal to 0', function () {
      var conditionCollection = new ConditionCollection();
      expect(conditionCollection.isEmpty()).toBe(true);
      conditionCollection.orderStack.push(1);
      expect(conditionCollection.isEmpty()).toBe(false);
    });
  });
  describe('isMatch', function () {
    it('should check is value is matched to the conditions at specified column index', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.columnTypes = {
        3: OPERATION_AND
      };
      var conditionMock = {};
      spyOn(conditionCollection, 'isMatchInConditions').and.returnValue(true);
      spyOn(conditionCollection, 'getConditions').and.returnValue([conditionMock]);
      var result = conditionCollection.isMatch('foo', 3);
      expect(conditionCollection.getConditions).toHaveBeenCalledWith(3);
      expect(conditionCollection.isMatchInConditions).toHaveBeenCalledWith([conditionMock], 'foo', OPERATION_AND);
      expect(result).toBe(true);
    });
    it('should check is value is matched to the conditions for all columns', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.columnTypes = {
        3: OPERATION_AND,
        13: OPERATION_AND
      };
      var conditionMock = {};
      var conditionMock2 = {};
      conditionCollection.conditions[OPERATION_AND]['3'] = [conditionMock];
      conditionCollection.conditions[OPERATION_AND]['13'] = [conditionMock2];
      spyOn(conditionCollection, 'isMatchInConditions').and.returnValue(true);
      spyOn(conditionCollection, 'getConditions').and.returnValue([conditionMock]);
      var result = conditionCollection.isMatch('foo');
      expect(conditionCollection.getConditions).not.toHaveBeenCalled();
      expect(conditionCollection.isMatchInConditions.calls.argsFor(0)).toEqual([[conditionMock], 'foo', OPERATION_AND]);
      expect(conditionCollection.isMatchInConditions.calls.argsFor(1)).toEqual([[conditionMock2], 'foo', OPERATION_AND]);
      expect(result).toBe(true);
    });
    it('should break checking value when current condition is not matched to the rules', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.columnTypes = {
        3: OPERATION_AND,
        13: OPERATION_AND
      };
      var conditionMock = {};
      var conditionMock2 = {};
      conditionCollection.conditions[OPERATION_AND]['3'] = [conditionMock];
      conditionCollection.conditions[OPERATION_AND]['13'] = [conditionMock2];
      spyOn(conditionCollection, 'isMatchInConditions').and.returnValue(false);
      spyOn(conditionCollection, 'getConditions').and.returnValue(conditionMock);
      var result = conditionCollection.isMatch('foo');
      expect(conditionCollection.getConditions).not.toHaveBeenCalled();
      expect(conditionCollection.isMatchInConditions.calls.count()).toBe(1);
      expect(conditionCollection.isMatchInConditions.calls.argsFor(0)).toEqual([[conditionMock], 'foo', OPERATION_AND]);
      expect(result).toBe(false);
    });
  });
  describe('isMatchInConditions', function () {
    it('should returns `true` if passed conditions is empty', function () {
      var conditionCollection = new ConditionCollection();
      var result = conditionCollection.isMatchInConditions([], 'foo');
      expect(result).toBe(true);
    });
    describe('OPERATION_AND', function () {
      it('should check if array of conditions is matched to the value', function () {
        var conditionCollection = new ConditionCollection();
        var conditionMock = {
          func: function func() {
            return true;
          }
        };
        var conditionMock2 = {
          func: function func() {
            return true;
          }
        };
        spyOn(conditionMock, 'func').and.callThrough();
        spyOn(conditionMock2, 'func').and.callThrough();
        var result = conditionCollection.isMatchInConditions([conditionMock, conditionMock2], 'foo');
        expect(conditionMock.func.calls.count()).toBe(1);
        expect(conditionMock.func).toHaveBeenCalledWith('foo');
        expect(conditionMock2.func.calls.count()).toBe(1);
        expect(conditionMock2.func).toHaveBeenCalledWith('foo');
        expect(result).toBe(true);
      });
      it('should break checking value when condition is not matched to the value', function () {
        var conditionCollection = new ConditionCollection();
        var conditionMock = {
          func: function func() {
            return false;
          }
        };
        var conditionMock2 = {
          func: function func() {
            return true;
          }
        };
        spyOn(conditionMock, 'func').and.callThrough();
        spyOn(conditionMock2, 'func').and.callThrough();
        var result = conditionCollection.isMatchInConditions([conditionMock, conditionMock2], 'foo');
        expect(conditionMock.func.calls.count()).toBe(1);
        expect(conditionMock.func).toHaveBeenCalledWith('foo');
        expect(conditionMock2.func.calls.count()).toBe(0);
        expect(result).toBe(false);
      });
    });
    describe('OPERATION_OR', function () {
      it('should check if one of conditions is matched to the value #1', function () {
        var conditionCollection = new ConditionCollection();
        var conditionMock = {
          func: function func() {
            return false;
          }
        };
        var conditionMock2 = {
          func: function func() {
            return true;
          }
        };
        spyOn(conditionMock, 'func').and.callThrough();
        spyOn(conditionMock2, 'func').and.callThrough();
        var result = conditionCollection.isMatchInConditions([conditionMock, conditionMock2], 'foo', OPERATION_OR);
        expect(conditionMock.func.calls.count()).toBe(1);
        expect(conditionMock.func).toHaveBeenCalledWith('foo');
        expect(conditionMock2.func.calls.count()).toBe(1);
        expect(conditionMock2.func).toHaveBeenCalledWith('foo');
        expect(result).toBe(true);
      });
      it('should check if one of conditions is matched to the value #2', function () {
        var conditionCollection = new ConditionCollection();
        var conditionMock = {
          func: function func() {
            return false;
          }
        };
        var conditionMock2 = {
          func: function func() {
            return false;
          }
        };
        spyOn(conditionMock, 'func').and.callThrough();
        spyOn(conditionMock2, 'func').and.callThrough();
        var result = conditionCollection.isMatchInConditions([conditionMock, conditionMock2], 'foo', OPERATION_OR);
        expect(conditionMock.func.calls.count()).toBe(1);
        expect(conditionMock.func).toHaveBeenCalledWith('foo');
        expect(conditionMock2.func.calls.count()).toBe(1);
        expect(conditionMock2.func).toHaveBeenCalledWith('foo');
        expect(result).toBe(false);
      });
      it('should break checking value when condition is matched to the value', function () {
        var conditionCollection = new ConditionCollection();
        var conditionMock = {
          func: function func() {
            return false;
          }
        };
        var conditionMock2 = {
          func: function func() {
            return true;
          }
        };
        var conditionMock3 = {
          func: function func() {
            return false;
          }
        };
        spyOn(conditionMock, 'func').and.callThrough();
        spyOn(conditionMock2, 'func').and.callThrough();
        spyOn(conditionMock3, 'func').and.callThrough();
        var result = conditionCollection.isMatchInConditions([conditionMock, conditionMock2, conditionMock3], 'foo', OPERATION_OR);
        expect(conditionMock3.func.calls.count()).toBe(0);
        expect(result).toBe(true);
      });
    });
  });
  describe('addCondition', function () {
    beforeEach(function () {
      conditions.eq = {
        condition: function condition() {},
        descriptor: {}
      };
      conditions.contains = {
        condition: function condition() {},
        descriptor: {}
      };
    });
    afterEach(function () {
      delete conditions.eq;
      delete conditions.contains;
    });
    it('should trigger `beforeAdd` and `afterAdd` hook on adding condition', function () {
      var conditionCollection = new ConditionCollection();
      var conditionMock = {
        args: [],
        command: {
          key: 'eq'
        }
      };
      var hookBeforeSpy = jasmine.createSpy('hookBefore');
      var hookAfterSpy = jasmine.createSpy('hookAfter');
      conditionCollection.addLocalHook('beforeAdd', hookBeforeSpy);
      conditionCollection.addLocalHook('afterAdd', hookAfterSpy);
      conditionCollection.addCondition(3, conditionMock);
      expect(hookBeforeSpy).toHaveBeenCalledWith(3);
      expect(hookAfterSpy).toHaveBeenCalledWith(3);
    });
    it('should add column index to the orderStack without duplicate values', function () {
      var conditionCollection = new ConditionCollection();
      var conditionMock = {
        args: [],
        command: {
          key: 'eq'
        }
      };
      conditionCollection.addCondition(3, conditionMock);
      conditionCollection.addCondition(3, conditionMock);
      conditionCollection.addCondition(3, conditionMock);
      expect(conditionCollection.orderStack).toEqual([3]);
    });
    it('should add condition to the collection at specified column index.', function () {
      var conditionCollection = new ConditionCollection();
      var conditionMock = {
        args: [1],
        command: {
          key: 'eq'
        }
      };
      conditionCollection.addCondition(3, conditionMock);
      expect(conditionCollection.conditions[OPERATION_AND]['3'].length).toBe(1);
      expect(conditionCollection.conditions[OPERATION_AND]['3'][0].name).toBe('eq');
      expect(conditionCollection.conditions[OPERATION_AND]['3'][0].args).toEqual([1]);
      expect(conditionCollection.conditions[OPERATION_AND]['3'][0].func instanceof Function).toBe(true);
    });
    it('should allow to add few condition under the same name and column index #160', function () {
      var conditionCollection = new ConditionCollection();
      var conditionMock = {
        args: ['A'],
        command: {
          key: 'contains'
        }
      };
      var conditionMock2 = {
        args: ['B'],
        command: {
          key: 'contains'
        }
      };
      var conditionMock3 = {
        args: ['C'],
        command: {
          key: 'contains'
        }
      };
      conditionCollection.addCondition(3, conditionMock);
      conditionCollection.addCondition(3, conditionMock2);
      conditionCollection.addCondition(3, conditionMock3);
      expect(conditionCollection.conditions[OPERATION_AND]['3'].length).toBe(3);
    });
    it('should allow to add few condition under the same column index ' + 'only when they are related to the same operation (throw exception otherwise) #160', function () {
      var conditionCollection = new ConditionCollection();
      var conditionMock = {
        args: ['A'],
        command: {
          key: 'contains'
        }
      };
      var conditionMock2 = {
        args: ['B'],
        command: {
          key: 'contains'
        }
      };
      var conditionMock3 = {
        args: ['C'],
        command: {
          key: 'contains'
        }
      };
      conditionCollection.addCondition(3, conditionMock, OPERATION_AND);
      conditionCollection.addCondition(3, conditionMock2, OPERATION_AND);
      expect(function () {
        conditionCollection.addCondition(3, conditionMock3, OPERATION_OR);
      }).toThrow(/has been already applied/);
    });
    it('should allow to add conditions only when they are related to the known operation ' + '(throw exception otherwise) #174', function () {
      var conditionCollection = new ConditionCollection();
      var conditionMock = {
        args: ['A'],
        command: {
          key: 'contains'
        }
      };
      expect(function () {
        conditionCollection.addCondition(3, conditionMock, 'unknownOperation');
      }).toThrow(/Unexpected operation/);
    });
  });
  describe('exportAllConditions', function () {
    it('should return an empty array when no conditions was added', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.orderStack = [];
      var exportedConditions = conditionCollection.exportAllConditions();
      expect(exportedConditions.length).toBe(0);
    });
    it('should return conditions as an array of objects for all column in the same order as it was added', function () {
      var conditionCollection = new ConditionCollection();
      var conditionMock = {
        name: 'begins_with',
        args: ['c']
      };
      var conditionMock1 = {
        name: 'date_tomorrow',
        args: []
      };
      var conditionMock2 = {
        name: 'eq',
        args: ['z']
      };
      conditionCollection.orderStack = [6, 1, 3];
      conditionCollection.columnTypes = {
        1: OPERATION_AND,
        3: OPERATION_AND,
        6: OPERATION_AND
      };
      conditionCollection.conditions[OPERATION_AND]['3'] = [conditionMock];
      conditionCollection.conditions[OPERATION_AND]['6'] = [conditionMock1];
      conditionCollection.conditions[OPERATION_AND]['1'] = [conditionMock2];
      var exportedConditions = conditionCollection.exportAllConditions();
      expect(exportedConditions.length).toBe(3);
      expect(exportedConditions[0].column).toBe(6);
      expect(exportedConditions[0].conditions[0].name).toBe('date_tomorrow');
      expect(exportedConditions[0].conditions[0].args).toEqual([]);
      expect(exportedConditions[1].column).toBe(1);
      expect(exportedConditions[1].conditions[0].name).toBe('eq');
      expect(exportedConditions[1].conditions[0].args).toEqual(['z']);
      expect(exportedConditions[2].column).toBe(3);
      expect(exportedConditions[2].conditions[0].name).toBe('begins_with');
      expect(exportedConditions[2].conditions[0].args).toEqual(['c']);
    });
  });
  describe('getConditions', function () {
    it('should return conditions at specified index otherwise should return empty array', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.columnTypes = {
        3: OPERATION_AND
      };
      var conditionMock = {};
      conditionCollection.conditions[OPERATION_AND]['3'] = [conditionMock];
      expect(conditionCollection.getConditions(2)).toEqual([]);
      expect(conditionCollection.getConditions(3)).toEqual([conditionMock]);
    });
  });
  describe('removeConditions', function () {
    it('should trigger `beforeRemove` and `afterRemove` hook on removing conditions', function () {
      var conditionCollection = new ConditionCollection();
      var conditionMock = {};
      conditionCollection.orderStack = [3];
      conditionCollection.conditions['3'] = [conditionMock];
      var hookBeforeSpy = jasmine.createSpy('hookBefore');
      var hookAfterSpy = jasmine.createSpy('hookAfter');
      conditionCollection.addLocalHook('beforeRemove', hookBeforeSpy);
      conditionCollection.addLocalHook('afterRemove', hookAfterSpy);
      conditionCollection.removeConditions(3);
      expect(hookBeforeSpy).toHaveBeenCalledWith(3);
      expect(hookAfterSpy).toHaveBeenCalledWith(3);
    });
    it('should remove condition from collection and column index from orderStack', function () {
      var conditionCollection = new ConditionCollection();
      var conditionMock = {};
      spyOn(conditionCollection, 'clearConditions');
      conditionCollection.orderStack = [3];
      conditionCollection.conditions['3'] = [conditionMock];
      conditionCollection.removeConditions(3);
      expect(conditionCollection.orderStack).toEqual([]);
      expect(conditionCollection.clearConditions).toHaveBeenCalledWith(3);
    });
  });
  describe('clearConditions', function () {
    it('should trigger `beforeClear` and `afterClear` hook on clearing conditions', function () {
      var conditionCollection = new ConditionCollection();
      var hookBeforeSpy = jasmine.createSpy('hookBefore');
      var hookAfterSpy = jasmine.createSpy('hookAfter');
      conditionCollection.addLocalHook('beforeClear', hookBeforeSpy);
      conditionCollection.addLocalHook('afterClear', hookAfterSpy);
      conditionCollection.clearConditions(3);
      expect(hookBeforeSpy).toHaveBeenCalledWith(3);
      expect(hookAfterSpy).toHaveBeenCalledWith(3);
    });
    it('should clear all conditions at specified column index', function () {
      var conditionCollection = new ConditionCollection();
      var conditionsMock = [{}, {}];
      spyOn(conditionCollection, 'getConditions').and.returnValue(conditionsMock);
      conditionCollection.clearConditions(3);
      expect(conditionCollection.getConditions).toHaveBeenCalledWith(3);
      expect(conditionsMock.length).toBe(0);
    });
  });
  describe('hasConditions', function () {
    it('should return `true` if at specified column index condition were found', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.columnTypes = {
        3: OPERATION_AND
      };
      var conditionsMock = [{}, {}];
      spyOn(conditionCollection, 'getConditions').and.returnValue(conditionsMock);
      var result = conditionCollection.hasConditions(3);
      expect(result).toBe(true);
    });
    it('should return `false` if at specified column index no conditions were found', function () {
      var conditionCollection = new ConditionCollection();
      var conditionsMock = [];
      spyOn(conditionCollection, 'getConditions').and.returnValue(conditionsMock);
      var result = conditionCollection.hasConditions(3);
      expect(result).toBe(false);
    });
    it('should return `true` if at specified column index condition were found under its name', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.columnTypes = {
        3: OPERATION_AND
      };
      var conditionsMock = [{
        name: 'lte'
      }, {
        name: 'eq'
      }];
      spyOn(conditionCollection, 'getConditions').and.returnValue(conditionsMock);
      var result = conditionCollection.hasConditions(3, 'eq');
      expect(result).toBe(true);
    });
    it('should return `false` if at specified column index no conditions were found under its name', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.columnTypes = {
        3: OPERATION_AND
      };
      var conditionsMock = [{
        name: 'lte'
      }, {
        name: 'eq'
      }];
      spyOn(conditionCollection, 'getConditions').and.returnValue(conditionsMock);
      var result = conditionCollection.hasConditions(3, 'between');
      expect(conditionCollection.getConditions).toHaveBeenCalledWith(3);
      expect(result).toBe(false);
    });
  });
  describe('clean', function () {
    it('should trigger `beforeClean` and `afterClean` hook on cleaning conditions', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.conditions = {
        0: []
      };
      conditionCollection.conditions = [1, 2, 3, 4];
      var hookBeforeSpy = jasmine.createSpy('hookBefore');
      var hookAfterSpy = jasmine.createSpy('hookAfter');
      conditionCollection.addLocalHook('beforeClean', hookBeforeSpy);
      conditionCollection.addLocalHook('afterClean', hookAfterSpy);
      conditionCollection.clean();
      expect(hookBeforeSpy).toHaveBeenCalled();
      expect(hookAfterSpy).toHaveBeenCalled();
    });
    it('should clear condition collection and orderStack', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.conditions = {
        0: []
      };
      conditionCollection.conditions = [1, 2, 3, 4];
      conditionCollection.clean();
      expect(conditionCollection.conditions).toEqual(jasmine.any(Object));
      expect(Object.keys(conditionCollection.conditions)).toEqual(Object.keys(operations));
      expect(conditionCollection.orderStack.length).toBe(0);
    });
  });
  describe('destroy', function () {
    it('should nullable all properties', function () {
      var conditionCollection = new ConditionCollection();
      conditionCollection.conditions[OPERATION_AND] = {
        0: [],
        2: []
      };
      conditionCollection.conditions[OPERATION_OR] = {
        3: [],
        4: []
      };
      conditionCollection.orderStack = [1, 2, 3, 4];
      conditionCollection.destroy();
      expect(conditionCollection.conditions).toBeNull();
      expect(conditionCollection.orderStack).toBeNull();
      expect(conditionCollection.columnTypes).toBeNull();
    });
  });
});