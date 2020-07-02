"use strict";

var _moment = _interopRequireDefault(require("moment"));

var _yesterday = require("handsontable/plugins/filters/condition/date/yesterday");

var _utils = require("../../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Filters condition (`date_yesterday`)', function () {
  var format = 'DD/MM/YYYY';
  it('should filter matching values', function () {
    var data = (0, _utils.dateRowFactory)({
      dateFormat: format
    });
    expect((0, _yesterday.condition)(data((0, _moment.default)().add(-1, 'days').format(format)))).toBe(true);
  });
  it('should filter not matching values', function () {
    var data = (0, _utils.dateRowFactory)({
      dateFormat: format
    });
    expect((0, _yesterday.condition)(data((0, _moment.default)().add(-3, 'days').format(format)))).toBe(false);
    expect((0, _yesterday.condition)(data((0, _moment.default)().add(-2, 'days').format(format)))).toBe(false);
    expect((0, _yesterday.condition)(data((0, _moment.default)().format(format)))).toBe(false);
    expect((0, _yesterday.condition)(data((0, _moment.default)().add(1, 'days').format(format)))).toBe(false);
    expect((0, _yesterday.condition)(data((0, _moment.default)().add(2, 'days').format(format)))).toBe(false);
    expect((0, _yesterday.condition)(data((0, _moment.default)().add(3, 'days').format(format)))).toBe(false);
  });
});