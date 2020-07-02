"use strict";

var _false = require("handsontable/plugins/filters/condition/false");

var _utils = require("../helpers/utils");

describe('Filters condition (`false`)', function () {
  it('should filter all values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _false.condition)(data(4))).toBe(false);
    expect((0, _false.condition)(data('1.9'))).toBe(false);
    expect((0, _false.condition)(data(-10))).toBe(false);
    expect((0, _false.condition)(data('-5'))).toBe(false);
    expect((0, _false.condition)(data(null))).toBe(false);
    expect((0, _false.condition)(data('null'))).toBe(false);
    expect((0, _false.condition)(data(void 0))).toBe(false);
    expect((0, _false.condition)(data(undefined))).toBe(false);
    expect((0, _false.condition)(data('undefined'))).toBe(false);
    expect((0, _false.condition)(data(''))).toBe(false);
    expect((0, _false.condition)(data(true))).toBe(false);
    expect((0, _false.condition)(data('true'))).toBe(false);
    expect((0, _false.condition)(data(false))).toBe(false);
    expect((0, _false.condition)(data('false'))).toBe(false);
  });
});