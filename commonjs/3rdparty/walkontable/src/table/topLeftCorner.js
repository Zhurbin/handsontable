"use strict";

exports.__esModule = true;
exports.default = void 0;

var _table = _interopRequireDefault(require("../table"));

var _stickyRowsTop = _interopRequireDefault(require("./mixin/stickyRowsTop"));

var _stickyColumnsLeft = _interopRequireDefault(require("./mixin/stickyColumnsLeft"));

var _object = require("./../../../../helpers/object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Subclass of `Table` that provides the helper methods relevant to TopLeftCornerOverlay, implemented through mixins.
 */
var TopLeftCornerOverlayTable =
/*#__PURE__*/
function (_Table) {
  _inherits(TopLeftCornerOverlayTable, _Table);

  function TopLeftCornerOverlayTable() {
    _classCallCheck(this, TopLeftCornerOverlayTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(TopLeftCornerOverlayTable).apply(this, arguments));
  }

  return TopLeftCornerOverlayTable;
}(_table.default);

(0, _object.mixin)(TopLeftCornerOverlayTable, _stickyRowsTop.default);
(0, _object.mixin)(TopLeftCornerOverlayTable, _stickyColumnsLeft.default);
var _default = TopLeftCornerOverlayTable;
exports.default = _default;