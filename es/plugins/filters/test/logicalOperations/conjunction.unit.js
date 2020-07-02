import { condition as trueFunction } from 'handsontable/plugins/filters/condition/true';
import { condition as falseFunction } from 'handsontable/plugins/filters/condition/false';
import { condition as beginsWithFunction } from 'handsontable/plugins/filters/condition/beginsWith';
import { condition as endsWithFunction } from 'handsontable/plugins/filters/condition/endsWith';
import { condition as containsFunction } from 'handsontable/plugins/filters/condition/contains';
import { operationResult as conjunction } from 'handsontable/plugins/filters/logicalOperations/conjunction';
import { conditionFactory, dateRowFactory } from '../helpers/utils';
describe('Operation on set of conditions (`conjunction`)', function () {
  var data = dateRowFactory();
  var trueConditionMock = conditionFactory(trueFunction);
  var falseConditionMock = conditionFactory(falseFunction);
  var beginsWithConditionMock = conditionFactory(beginsWithFunction);
  var endsWithConditionMock = conditionFactory(endsWithFunction);
  var containsWithConditionMock = conditionFactory(containsFunction);
  var anycellData = data('');
  var cellData = data('Alibaba');
  it('should filter matching values', function () {
    expect(conjunction([trueConditionMock(), trueConditionMock(), trueConditionMock()], anycellData)).toBe(true);
    expect(conjunction([beginsWithConditionMock(['a']), endsWithConditionMock(['a']), containsWithConditionMock(['b'])], cellData)).toBe(true);
  });
  it('should filter not matching values', function () {
    expect(conjunction([trueConditionMock(), falseConditionMock(), falseConditionMock()], anycellData)).toBe(false);
    expect(conjunction([trueConditionMock(), falseConditionMock(), trueConditionMock()], anycellData)).toBe(false);
    expect(conjunction([beginsWithConditionMock(['a']), falseConditionMock(), falseConditionMock()], cellData)).toBe(false);
    expect(conjunction([beginsWithConditionMock(['a']), endsWithConditionMock(['a']), containsWithConditionMock(['z'])], cellData)).toBe(false);
    expect(conjunction([falseConditionMock(), falseConditionMock(), falseConditionMock()], anycellData)).toBe(false);
    expect(conjunction([beginsWithConditionMock(['b']), endsWithConditionMock(['b']), containsWithConditionMock(['z'])], cellData)).toBe(false);
  });
});