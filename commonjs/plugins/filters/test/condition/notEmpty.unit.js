"use strict";

var _notEmpty = require("handsontable/plugins/filters/condition/notEmpty");

var _utils = require("../helpers/utils");

describe('Filters condition (`not_empty`)', function () {
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _notEmpty.condition)(data('tom'), [])).toBe(true);
    expect((0, _notEmpty.condition)(data(1), [])).toBe(true);
    expect((0, _notEmpty.condition)(data(0), [])).toBe(true);
    expect((0, _notEmpty.condition)(data(false), [])).toBe(true);
    expect((0, _notEmpty.condition)(data(true), [])).toBe(true);
    expect((0, _notEmpty.condition)(data({}), [])).toBe(true);
    expect((0, _notEmpty.condition)(data([]), [])).toBe(true);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)();
    expect((0, _notEmpty.condition)(data(''), [])).toBe(false);
    expect((0, _notEmpty.condition)(data(null), [])).toBe(false);
    expect((0, _notEmpty.condition)(data(void 0), [])).toBe(false);
  });
});