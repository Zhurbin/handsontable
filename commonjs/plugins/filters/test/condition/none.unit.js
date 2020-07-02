"use strict";

var _none = require("handsontable/plugins/filters/condition/none");

var _utils = require("../helpers/utils");

describe('Filters condition (`none`)', function () {
  it('should filter all values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _none.condition)(data(4))).toBe(true);
    expect((0, _none.condition)(data(3))).toBe(true);
    expect((0, _none.condition)(data(2))).toBe(true);
    expect((0, _none.condition)(data('1.9'))).toBe(true);
    expect((0, _none.condition)(data(-10))).toBe(true);
    expect((0, _none.condition)(data('-5'))).toBe(true);
    expect((0, _none.condition)(data(null))).toBe(true);
    expect((0, _none.condition)(data(void 0))).toBe(true);
    expect((0, _none.condition)(data(''))).toBe(true);
    expect((0, _none.condition)(data(true))).toBe(true);
    expect((0, _none.condition)(data(false))).toBe(true);
  });
});