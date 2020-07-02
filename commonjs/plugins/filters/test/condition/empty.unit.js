"use strict";

var _empty = require("handsontable/plugins/filters/condition/empty");

var _utils = require("../helpers/utils");

describe('Filters condition (`empty`)', function () {
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _empty.condition)(data(''), [])).toBe(true);
    expect((0, _empty.condition)(data(null), [])).toBe(true);
    expect((0, _empty.condition)(data(void 0), [])).toBe(true);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _empty.condition)(data('tom'), [])).toBe(false);
    expect((0, _empty.condition)(data(1), [])).toBe(false);
    expect((0, _empty.condition)(data(0), [])).toBe(false);
    expect((0, _empty.condition)(data(false), [])).toBe(false);
    expect((0, _empty.condition)(data(true), [])).toBe(false);
    expect((0, _empty.condition)(data({}), [])).toBe(false);
    expect((0, _empty.condition)(data([]), [])).toBe(false);
  });
});