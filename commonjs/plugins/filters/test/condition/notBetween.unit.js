"use strict";

var _notBetween = require("handsontable/plugins/filters/condition/notBetween");

var _utils = require("../helpers/utils");

describe('Filters condition (`not_between`)', function () {
  it('should filter matching values (numeric cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'numeric'
    });
    expect((0, _notBetween.condition)(data(4), [1, 3])).toBe(true);
    expect((0, _notBetween.condition)(data(4), [-4, 3])).toBe(true);
    expect((0, _notBetween.condition)(data(4), [5, 53])).toBe(true);
    expect((0, _notBetween.condition)(data(4), [4.00001, 53])).toBe(true);
    expect((0, _notBetween.condition)(data(4), ['5', '53'])).toBe(true);
    expect((0, _notBetween.condition)(data(-4), [5, 53])).toBe(true);
    expect((0, _notBetween.condition)(data(-4), [-10, -5])).toBe(true);
    expect((0, _notBetween.condition)(data(-4), ['-10', '-5'])).toBe(true);
  });
  it('should filter not matching values (numeric cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'numeric'
    });
    expect((0, _notBetween.condition)(data(4), [4, 9])).toBe(false);
    expect((0, _notBetween.condition)(data(4), [4, 4])).toBe(false);
    expect((0, _notBetween.condition)(data(4), [9, 3])).toBe(false);
    expect((0, _notBetween.condition)(data(4), [3.999, 6.9])).toBe(false);
    expect((0, _notBetween.condition)(data(4), ['3.999', 6.9])).toBe(false);
    expect((0, _notBetween.condition)(data(4), ['3.999', '6.9'])).toBe(false);
    expect((0, _notBetween.condition)(data(-4), [-9, -3])).toBe(false);
    expect((0, _notBetween.condition)(data(-4), [-4, -4])).toBe(false);
    expect((0, _notBetween.condition)(data(-4), ['-4', '-4'])).toBe(false);
  });
  it('should filter matching values (date cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'date',
      dateFormat: 'YYYY-MM-DD'
    });
    expect((0, _notBetween.condition)(data('2015-12-20'), ['2015-11-20', '2015-12-24'])).toBe(false);
    expect((0, _notBetween.condition)(data('2015-12-20'), ['2015-12-20', '2015-12-20'])).toBe(false);
    expect((0, _notBetween.condition)(data('2015-12-20'), ['2013', '2014'])).toBe(true);
    expect((0, _notBetween.condition)(data('2015-12-20'), ['2013', 'bar'])).toBe(true);
  });
  it('should filter not matching values (date cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'date',
      dateFormat: 'YYYY-MM-DD'
    });
    expect((0, _notBetween.condition)(data('2015-12-20'), ['2015-11-20', '2015-12-24'])).toBe(false);
    expect((0, _notBetween.condition)(data('2015-12-20'), ['2015-12-20', '2015-12-20'])).toBe(false);
    expect((0, _notBetween.condition)(data('2015-12-20'), ['2015', '2016'])).toBe(false);
  });
  it('should filter matching values (text cell type)', function () {
    var data = (0, _utils.dateRowFactory)({
      type: 'text'
    });
    expect((0, _notBetween.condition)(data('f'), ['a', 'z'])).toBe(false);
    expect((0, _notBetween.condition)(data('foo'), ['a', 'z'])).toBe(false);
    expect((0, _notBetween.condition)(data('foo'), ['f', 'z'])).toBe(false);
    expect((0, _notBetween.condition)(data('f'), ['f', 'f'])).toBe(false);
  });
});