"use strict";

var _notContains = require("handsontable/plugins/filters/condition/notContains");

var _utils = require("../helpers/utils");

describe('Filters condition (`not_contains`)', function () {
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _notContains.condition)(data('tom'), ['ome'])).toBe(true);
    expect((0, _notContains.condition)(data('tom'), ['mt'])).toBe(true);
    expect((0, _notContains.condition)(data('tom'), ['z'])).toBe(true);
    expect((0, _notContains.condition)(data('2015-10-10'), ['/10'])).toBe(true);
    expect((0, _notContains.condition)(data(1), ['2'])).toBe(true);
    expect((0, _notContains.condition)(data('1'), [2])).toBe(true);
    expect((0, _notContains.condition)(data(1), ['2'])).toBe(true);
    expect((0, _notContains.condition)(data(true), ['truee'])).toBe(true);
    expect((0, _notContains.condition)(data(true), ['true '])).toBe(true);
    expect((0, _notContains.condition)(data('true'), [false])).toBe(true);
    expect((0, _notContains.condition)(data(true), ['e '])).toBe(true);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _notContains.condition)(data('tom'), [''])).toBe(false);
    expect((0, _notContains.condition)(data('tom'), ['t'])).toBe(false);
    expect((0, _notContains.condition)(data('tom'), ['o'])).toBe(false);
    expect((0, _notContains.condition)(data('tom'), ['om'])).toBe(false);
    expect((0, _notContains.condition)(data('2015-10-10'), ['015'])).toBe(false);
    expect((0, _notContains.condition)(data('2015-10-10'), ['15-10-10'])).toBe(false);
    expect((0, _notContains.condition)(data(1), [1])).toBe(false);
    expect((0, _notContains.condition)(data('1'), [1])).toBe(false);
    expect((0, _notContains.condition)(data(1), ['1'])).toBe(false);
    expect((0, _notContains.condition)(data(true), ['ue'])).toBe(false);
    expect((0, _notContains.condition)(data(true), ['tr'])).toBe(false);
    expect((0, _notContains.condition)(data('true'), ['r'])).toBe(false);
    expect((0, _notContains.condition)(data(true), ['t'])).toBe(false);
  });
});