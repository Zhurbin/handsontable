"use strict";

var _true = require("handsontable/plugins/filters/condition/true");

var _false = require("handsontable/plugins/filters/condition/false");

var _beginsWith = require("handsontable/plugins/filters/condition/beginsWith");

var _endsWith = require("handsontable/plugins/filters/condition/endsWith");

var _contains = require("handsontable/plugins/filters/condition/contains");

var _disjunction = require("handsontable/plugins/filters/logicalOperations/disjunction");

var _utils = require("../helpers/utils");

describe('Operation on set of conditions (`disjunction`)', function () {
  var data = (0, _utils.dateRowFactory)();
  var trueConditionMock = (0, _utils.conditionFactory)(_true.condition);
  var falseConditionMock = (0, _utils.conditionFactory)(_false.condition);
  var beginsWithConditionMock = (0, _utils.conditionFactory)(_beginsWith.condition);
  var endsWithConditionMock = (0, _utils.conditionFactory)(_endsWith.condition);
  var containsWithConditionMock = (0, _utils.conditionFactory)(_contains.condition);
  var anycellData = data('');
  var cellData = data('Alibaba');
  it('should filter matching values', function () {
    expect((0, _disjunction.operationResult)([trueConditionMock(), trueConditionMock(), trueConditionMock()], anycellData)).toBe(true);
    expect((0, _disjunction.operationResult)([trueConditionMock(), falseConditionMock(), trueConditionMock()], anycellData)).toBe(true);
    expect((0, _disjunction.operationResult)([trueConditionMock(), falseConditionMock(), falseConditionMock()], anycellData)).toBe(true);
    expect((0, _disjunction.operationResult)([beginsWithConditionMock(['a']), falseConditionMock(), falseConditionMock()], cellData)).toBe(true);
    expect((0, _disjunction.operationResult)([beginsWithConditionMock(['a']), endsWithConditionMock(['a']), containsWithConditionMock(['b'])], cellData)).toBe(true);
    expect((0, _disjunction.operationResult)([beginsWithConditionMock(['a']), endsWithConditionMock(['a']), containsWithConditionMock(['z'])], cellData)).toBe(true);
  });
  it('should filter not matching values', function () {
    expect((0, _disjunction.operationResult)([falseConditionMock(), falseConditionMock(), falseConditionMock()], anycellData)).toBe(false);
    expect((0, _disjunction.operationResult)([beginsWithConditionMock(['b']), endsWithConditionMock(['b']), containsWithConditionMock(['z'])], cellData)).toBe(false);
  });
});