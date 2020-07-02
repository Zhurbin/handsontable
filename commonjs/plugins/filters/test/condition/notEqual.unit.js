"use strict";

var _notEqual = require("handsontable/plugins/filters/condition/notEqual");

var _utils = require("../helpers/utils");

describe('Filters condition (`neq`)', function () {
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _notEqual.condition)(data('tom'), ['o'])).toBe(true);
    expect((0, _notEqual.condition)(data('tom'), ['m'])).toBe(true);
    expect((0, _notEqual.condition)(data('tom'), ['tomeeee'])).toBe(true);
    expect((0, _notEqual.condition)(data('2015-10-10'), ['2015/10'])).toBe(true);
    expect((0, _notEqual.condition)(data(1), ['2'])).toBe(true);
    expect((0, _notEqual.condition)(data('1'), [2])).toBe(true);
    expect((0, _notEqual.condition)(data(1), ['2'])).toBe(true);
    expect((0, _notEqual.condition)(data(true), [false])).toBe(true);
    expect((0, _notEqual.condition)(data(true), ['false'])).toBe(true);
    expect((0, _notEqual.condition)(data('true'), [false])).toBe(true);
    expect((0, _notEqual.condition)(data(true), ['e'])).toBe(true);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _notEqual.condition)(data('tom'), ['tom'])).toBe(false);
    expect((0, _notEqual.condition)(data('2015-10-10'), ['2015-10-10'])).toBe(false);
    expect((0, _notEqual.condition)(data(1), [1])).toBe(false);
    expect((0, _notEqual.condition)(data('1'), [1])).toBe(false);
    expect((0, _notEqual.condition)(data(1), ['1'])).toBe(false);
    expect((0, _notEqual.condition)(data(true), [true])).toBe(false);
    expect((0, _notEqual.condition)(data(true), ['true'])).toBe(false);
    expect((0, _notEqual.condition)(data('true'), [true])).toBe(false);
    expect((0, _notEqual.condition)(data(null), [null])).toBe(false);
    expect((0, _notEqual.condition)(data(null), [''])).toBe(false);
    expect((0, _notEqual.condition)(data(null), [void 0])).toBe(false);
  });
});