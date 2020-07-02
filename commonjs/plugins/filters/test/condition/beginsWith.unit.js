"use strict";

var _beginsWith = require("handsontable/plugins/filters/condition/beginsWith");

var _utils = require("../helpers/utils");

describe('Filters condition (`begins_with`)', function () {
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _beginsWith.condition)(data('tom'), [''])).toBe(true);
    expect((0, _beginsWith.condition)(data('tom'), ['t'])).toBe(true);
    expect((0, _beginsWith.condition)(data('tom'), ['to'])).toBe(true);
    expect((0, _beginsWith.condition)(data('tom'), ['tom'])).toBe(true);
    expect((0, _beginsWith.condition)(data('2015-10-10'), ['2015'])).toBe(true);
    expect((0, _beginsWith.condition)(data('2015-10-10'), ['2015-10'])).toBe(true);
    expect((0, _beginsWith.condition)(data(1), [1])).toBe(true);
    expect((0, _beginsWith.condition)(data('1'), [1])).toBe(true);
    expect((0, _beginsWith.condition)(data(1), ['1'])).toBe(true);
    expect((0, _beginsWith.condition)(data(true), [true])).toBe(true);
    expect((0, _beginsWith.condition)(data(true), ['true'])).toBe(true);
    expect((0, _beginsWith.condition)(data('true'), [true])).toBe(true);
    expect((0, _beginsWith.condition)(data(true), ['t'])).toBe(true);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _beginsWith.condition)(data('tom'), ['o'])).toBe(false);
    expect((0, _beginsWith.condition)(data('tom'), ['m'])).toBe(false);
    expect((0, _beginsWith.condition)(data('tom'), ['tomeeee'])).toBe(false);
    expect((0, _beginsWith.condition)(data('2015-10-10'), ['2015/10'])).toBe(false);
    expect((0, _beginsWith.condition)(data(1), ['2'])).toBe(false);
    expect((0, _beginsWith.condition)(data('1'), [2])).toBe(false);
    expect((0, _beginsWith.condition)(data(1), ['2'])).toBe(false);
    expect((0, _beginsWith.condition)(data(true), [false])).toBe(false);
    expect((0, _beginsWith.condition)(data(true), ['false'])).toBe(false);
    expect((0, _beginsWith.condition)(data('true'), [false])).toBe(false);
    expect((0, _beginsWith.condition)(data(true), ['e'])).toBe(false);
  });
});