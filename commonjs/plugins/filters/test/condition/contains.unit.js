"use strict";

var _contains = require("handsontable/plugins/filters/condition/contains");

var _utils = require("../helpers/utils");

describe('Filters condition (`contains`)', function () {
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _contains.condition)(data('tom'), [''])).toBe(true);
    expect((0, _contains.condition)(data('tom'), ['t'])).toBe(true);
    expect((0, _contains.condition)(data('tom'), ['o'])).toBe(true);
    expect((0, _contains.condition)(data('tom'), ['om'])).toBe(true);
    expect((0, _contains.condition)(data('2015-10-10'), ['015'])).toBe(true);
    expect((0, _contains.condition)(data('2015-10-10'), ['15-10-10'])).toBe(true);
    expect((0, _contains.condition)(data(1), [1])).toBe(true);
    expect((0, _contains.condition)(data('1'), [1])).toBe(true);
    expect((0, _contains.condition)(data(1), ['1'])).toBe(true);
    expect((0, _contains.condition)(data(true), ['ue'])).toBe(true);
    expect((0, _contains.condition)(data(true), ['tr'])).toBe(true);
    expect((0, _contains.condition)(data('true'), ['r'])).toBe(true);
    expect((0, _contains.condition)(data(true), ['t'])).toBe(true);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _contains.condition)(data('tom'), ['ome'])).toBe(false);
    expect((0, _contains.condition)(data('tom'), ['mt'])).toBe(false);
    expect((0, _contains.condition)(data('tom'), ['z'])).toBe(false);
    expect((0, _contains.condition)(data('2015-10-10'), ['/10'])).toBe(false);
    expect((0, _contains.condition)(data(1), ['2'])).toBe(false);
    expect((0, _contains.condition)(data('1'), [2])).toBe(false);
    expect((0, _contains.condition)(data(1), ['2'])).toBe(false);
    expect((0, _contains.condition)(data(true), ['truee'])).toBe(false);
    expect((0, _contains.condition)(data(true), ['true '])).toBe(false);
    expect((0, _contains.condition)(data('true'), [false])).toBe(false);
    expect((0, _contains.condition)(data(true), ['e '])).toBe(false);
  });
});