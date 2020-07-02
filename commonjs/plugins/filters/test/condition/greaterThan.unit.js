"use strict";

var _greaterThan = require("handsontable/plugins/filters/condition/greaterThan");

var _utils = require("../helpers/utils");

describe('Filters condition (`gt`)', function () {
  it('should filter matching values (numeric cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'numeric'
    });
    expect((0, _greaterThan.condition)(data(4), [3])).toBe(true);
    expect((0, _greaterThan.condition)(data(4), [2])).toBe(true);
    expect((0, _greaterThan.condition)(data(4), ['1.9'])).toBe(true);
    expect((0, _greaterThan.condition)(data(-4), [-10])).toBe(true);
    expect((0, _greaterThan.condition)(data(-4), ['-5'])).toBe(true);
  });
  it('should filter not matching values (numeric cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'numeric'
    });
    expect((0, _greaterThan.condition)(data(4), [4])).toBe(false);
    expect((0, _greaterThan.condition)(data(4), [43])).toBe(false);
    expect((0, _greaterThan.condition)(data(4), ['55'])).toBe(false);
    expect((0, _greaterThan.condition)(data(4), [42.99])).toBe(false);
    expect((0, _greaterThan.condition)(data(-4), [-2])).toBe(false);
    expect((0, _greaterThan.condition)(data(-4), [-3.11])).toBe(false);
  });
  it('should filter matching values (text cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'text'
    });
    expect((0, _greaterThan.condition)(data('foo'), ['bar'])).toBe(true);
    expect((0, _greaterThan.condition)(data('4'), ['2'])).toBe(true);
    expect((0, _greaterThan.condition)(data(4), ['1.9'])).toBe(true);
  });
  it('should filter not matching values (text cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'text'
    });
    expect((0, _greaterThan.condition)(data('boo'), ['zar'])).toBe(false);
    expect((0, _greaterThan.condition)(data('4'), ['45'])).toBe(false);
    expect((0, _greaterThan.condition)(data(4), ['9.9'])).toBe(false);
  });
});