"use strict";

var _after = require("handsontable/plugins/filters/condition/date/after");

var _utils = require("../../helpers/utils");

describe('Filters condition (`date_after`)', function () {
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)({
      dateFormat: 'DD/MM/YYYY'
    });
    expect((0, _after.condition)(data('12/05/2015'), ['12/05/2015'])).toBe(true);
    expect((0, _after.condition)(data('12/05/2015'), ['11/05/2015'])).toBe(true);
    expect((0, _after.condition)(data('12/05/2015'), ['11/05/1999'])).toBe(true);
    expect((0, _after.condition)(data('12/05/2015'), ['11-05-1999'])).toBe(true); // Invalid format

    expect((0, _after.condition)(data('12/05/2015'), ['2012'])).toBe(false);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)({
      dateFormat: 'DD/MM/YYYY'
    });
    expect((0, _after.condition)(data('12/05/2015'), ['13/05/2015'])).toBe(false);
    expect((0, _after.condition)(data('12/05/2015'), ['05/2015'])).toBe(false);
    expect((0, _after.condition)(data('12/05/2015'), ['2017'])).toBe(false);
  });
});