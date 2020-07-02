"use strict";

var _true = require("handsontable/plugins/filters/condition/true");

var _utils = require("../helpers/utils");

describe('Filters condition (`true`)', function () {
  it('should filter no values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _true.condition)(data(4))).toBe(true);
    expect((0, _true.condition)(data('1.9'))).toBe(true);
    expect((0, _true.condition)(data(-10))).toBe(true);
    expect((0, _true.condition)(data('-5'))).toBe(true);
    expect((0, _true.condition)(data(null))).toBe(true);
    expect((0, _true.condition)(data('null'))).toBe(true);
    expect((0, _true.condition)(data(void 0))).toBe(true);
    expect((0, _true.condition)(data(undefined))).toBe(true);
    expect((0, _true.condition)(data('undefined'))).toBe(true);
    expect((0, _true.condition)(data(''))).toBe(true);
    expect((0, _true.condition)(data(true))).toBe(true);
    expect((0, _true.condition)(data('true'))).toBe(true);
    expect((0, _true.condition)(data(false))).toBe(true);
    expect((0, _true.condition)(data('false'))).toBe(true);
  });
});