"use strict";

var _before = require("handsontable/plugins/filters/condition/date/before");

var _utils = require("../../helpers/utils");

describe('Filters condition (`date_before`)', function () {
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)({
      dateFormat: 'DD/MM/YYYY'
    });
    expect((0, _before.condition)(data('12/05/2015'), ['12/05/2015'])).toBe(true);
    expect((0, _before.condition)(data('12/05/2015'), ['13/05/2015'])).toBe(true);
    expect((0, _before.condition)(data('12/05/2015'), ['14/05/2018'])).toBe(true);
    expect((0, _before.condition)(data('12/05/2015'), ['14-05-2019'])).toBe(true);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)({
      dateFormat: 'DD/MM/YYYY'
    });
    expect((0, _before.condition)(data('12/05/2015'), ['11/05/2015'])).toBe(false);
    expect((0, _before.condition)(data('12/05/2015'), ['05/2014'])).toBe(false);
    expect((0, _before.condition)(data('12/05/2015'), ['2014'])).toBe(false);
  });
});