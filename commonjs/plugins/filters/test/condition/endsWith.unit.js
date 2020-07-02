"use strict";

var _endsWith = require("handsontable/plugins/filters/condition/endsWith");

var _utils = require("../helpers/utils");

describe('Filters condition (`ends_with`)', function () {
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _endsWith.condition)(data('tom'), [''])).toBe(true);
    expect((0, _endsWith.condition)(data('tom'), ['m'])).toBe(true);
    expect((0, _endsWith.condition)(data('tom'), ['om'])).toBe(true);
    expect((0, _endsWith.condition)(data('tom'), ['tom'])).toBe(true);
    expect((0, _endsWith.condition)(data('2015-10-10'), ['-10'])).toBe(true);
    expect((0, _endsWith.condition)(data('2015-10-10'), ['10-10'])).toBe(true);
    expect((0, _endsWith.condition)(data(1), [1])).toBe(true);
    expect((0, _endsWith.condition)(data('1'), [1])).toBe(true);
    expect((0, _endsWith.condition)(data(1), ['1'])).toBe(true);
    expect((0, _endsWith.condition)(data(true), [true])).toBe(true);
    expect((0, _endsWith.condition)(data(true), ['true'])).toBe(true);
    expect((0, _endsWith.condition)(data('true'), [true])).toBe(true);
    expect((0, _endsWith.condition)(data(true), ['e'])).toBe(true);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _endsWith.condition)(data('tom'), ['o'])).toBe(false);
    expect((0, _endsWith.condition)(data('tom'), ['m '])).toBe(false);
    expect((0, _endsWith.condition)(data('tom'), ['tttttom'])).toBe(false);
    expect((0, _endsWith.condition)(data('2015-10-10'), ['/10'])).toBe(false);
    expect((0, _endsWith.condition)(data(1), ['2'])).toBe(false);
    expect((0, _endsWith.condition)(data('1'), [2])).toBe(false);
    expect((0, _endsWith.condition)(data(1), ['2'])).toBe(false);
    expect((0, _endsWith.condition)(data(true), [false])).toBe(false);
    expect((0, _endsWith.condition)(data(true), ['false'])).toBe(false);
    expect((0, _endsWith.condition)(data('true'), [false])).toBe(false);
    expect((0, _endsWith.condition)(data(true), [' true'])).toBe(false);
  });
});