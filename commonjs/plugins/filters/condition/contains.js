"use strict";

exports.__esModule = true;
exports.condition = condition;
exports.CONDITION_NAME = void 0;

var C = _interopRequireWildcard(require("../../../i18n/constants"));

var _mixed = require("../../../helpers/mixed");

var _conditionRegisterer = require("../conditionRegisterer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CONDITION_NAME = 'contains';
exports.CONDITION_NAME = CONDITION_NAME;

function condition(dataRow, _ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      value = _ref2[0];

  return (0, _mixed.stringify)(dataRow.value).toLowerCase().indexOf((0, _mixed.stringify)(value)) >= 0;
}

(0, _conditionRegisterer.registerCondition)(CONDITION_NAME, condition, {
  name: C.FILTERS_CONDITIONS_CONTAINS,
  inputsCount: 1,
  showOperators: true
});