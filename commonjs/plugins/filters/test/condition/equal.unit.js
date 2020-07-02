"use strict";

var _equal = require("handsontable/plugins/filters/condition/equal");

var _utils = require("../helpers/utils");

describe('Filters condition (`eq`)', function () {
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _equal.condition)(data('tom'), ['tom'])).toBe(true);
    expect((0, _equal.condition)(data('2015-10-10'), ['2015-10-10'])).toBe(true);
    expect((0, _equal.condition)(data(1), [1])).toBe(true);
    expect((0, _equal.condition)(data('1'), [1])).toBe(true);
    expect((0, _equal.condition)(data(1), ['1'])).toBe(true);
    expect((0, _equal.condition)(data(true), [true])).toBe(true);
    expect((0, _equal.condition)(data(true), ['true'])).toBe(true);
    expect((0, _equal.condition)(data('true'), [true])).toBe(true);
    expect((0, _equal.condition)(data(null), [null])).toBe(true);
    expect((0, _equal.condition)(data(null), [''])).toBe(true);
    expect((0, _equal.condition)(data(null), [void 0])).toBe(true);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _equal.condition)(data('tom'), ['o'])).toBe(false);
    expect((0, _equal.condition)(data('tom'), ['m'])).toBe(false);
    expect((0, _equal.condition)(data('tom'), ['tomeeee'])).toBe(false);
    expect((0, _equal.condition)(data('2015-10-10'), ['2015/10'])).toBe(false);
    expect((0, _equal.condition)(data(1), ['2'])).toBe(false);
    expect((0, _equal.condition)(data('1'), [2])).toBe(false);
    expect((0, _equal.condition)(data(1), ['2'])).toBe(false);
    expect((0, _equal.condition)(data(true), [false])).toBe(false);
    expect((0, _equal.condition)(data(true), ['false'])).toBe(false);
    expect((0, _equal.condition)(data('true'), [false])).toBe(false);
    expect((0, _equal.condition)(data(true), ['e'])).toBe(false);
  });
});