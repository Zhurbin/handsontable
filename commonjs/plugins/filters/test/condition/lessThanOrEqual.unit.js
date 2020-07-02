"use strict";

var _lessThanOrEqual = require("handsontable/plugins/filters/condition/lessThanOrEqual");

var _utils = require("../helpers/utils");

describe('Filters condition (`lte`)', function () {
  it('should filter matching values (numeric cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'numeric'
    });
    expect((0, _lessThanOrEqual.condition)(data(4), [4])).toBe(true);
    expect((0, _lessThanOrEqual.condition)(data(3), [4])).toBe(true);
    expect((0, _lessThanOrEqual.condition)(data(2), [4])).toBe(true);
    expect((0, _lessThanOrEqual.condition)(data('1.9'), [2])).toBe(true);
    expect((0, _lessThanOrEqual.condition)(data(-10), [-4])).toBe(true);
    expect((0, _lessThanOrEqual.condition)(data('-5'), [-4])).toBe(true);
  });
  it('should filter not matching values (numeric cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'numeric'
    });
    expect((0, _lessThanOrEqual.condition)(data(43), [4])).toBe(false);
    expect((0, _lessThanOrEqual.condition)(data('55'), [4])).toBe(false);
    expect((0, _lessThanOrEqual.condition)(data(42.99), [4])).toBe(false);
    expect((0, _lessThanOrEqual.condition)(data(-2), [-4])).toBe(false);
    expect((0, _lessThanOrEqual.condition)(data(-3.11), [-4])).toBe(false);
  });
  it('should filter matching values (text cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'text'
    });
    expect((0, _lessThanOrEqual.condition)(data('bar'), ['foo'])).toBe(true);
    expect((0, _lessThanOrEqual.condition)(data('2'), ['4'])).toBe(true);
    expect((0, _lessThanOrEqual.condition)(data('1.9'), [4])).toBe(true);
  });
  it('should filter not matching values (text cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'text'
    });
    expect((0, _lessThanOrEqual.condition)(data('zar'), ['boo'])).toBe(false);
    expect((0, _lessThanOrEqual.condition)(data('45'), ['4'])).toBe(false);
    expect((0, _lessThanOrEqual.condition)(data('9.9'), [4])).toBe(false);
  });
});