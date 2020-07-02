"use strict";

exports.__esModule = true;
exports.default = void 0;

var _element = require("../../../helpers/dom/element");

var _object = require("../../../helpers/object");

var _base = _interopRequireDefault(require("./_base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var privatePool = new WeakMap();
/**
 * @class InputUI
 * @util
 */

var InputUI =
/*#__PURE__*/
function (_BaseUI) {
  _inherits(InputUI, _BaseUI);

  _createClass(InputUI, null, [{
    key: "DEFAULTS",
    get: function get() {
      return (0, _object.clone)({
        placeholder: '',
        type: 'text',
        tagName: 'input'
      });
    }
  }]);

  function InputUI(hotInstance, options) {
    var _this;

    _classCallCheck(this, InputUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputUI).call(this, hotInstance, (0, _object.extend)(InputUI.DEFAULTS, options)));
    privatePool.set(_assertThisInitialized(_assertThisInitialized(_this)), {});

    _this.registerHooks();

    return _this;
  }
  /**
   * Register all necessary hooks.
   */


  _createClass(InputUI, [{
    key: "registerHooks",
    value: function registerHooks() {
      var _this2 = this;

      this.addLocalHook('click', function () {
        return _this2.onClick();
      });
      this.addLocalHook('keyup', function (event) {
        return _this2.onKeyup(event);
      });
    }
    /**
     * Build DOM structure.
     */

  }, {
    key: "build",
    value: function build() {
      _get(_getPrototypeOf(InputUI.prototype), "build", this).call(this);

      var priv = privatePool.get(this);
      var icon = this.hot.rootDocument.createElement('div');
      priv.input = this._element.firstChild;
      (0, _element.addClass)(this._element, 'htUIInput');
      (0, _element.addClass)(icon, 'htUIInputIcon');

      this._element.appendChild(icon);

      this.update();
    }
    /**
     * Update element.
     */

  }, {
    key: "update",
    value: function update() {
      if (!this.isBuilt()) {
        return;
      }

      var input = privatePool.get(this).input;
      input.type = this.options.type;
      input.placeholder = this.translateIfPossible(this.options.placeholder);
      input.value = this.translateIfPossible(this.options.value);
    }
    /**
     * Focus element.
     */

  }, {
    key: "focus",
    value: function focus() {
      if (this.isBuilt()) {
        privatePool.get(this).input.focus();
      }
    }
    /**
     * OnClick listener.
     */

  }, {
    key: "onClick",
    value: function onClick() {}
    /**
     * OnKeyup listener.
     *
     * @param {Event} event
     */

  }, {
    key: "onKeyup",
    value: function onKeyup(event) {
      this.options.value = event.target.value;
    }
  }]);

  return InputUI;
}(_base.default);

var _default = InputUI;
exports.default = _default;