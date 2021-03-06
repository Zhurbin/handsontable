"use strict";

exports.__esModule = true;
exports.default = void 0;

var _editors = require("./../editors");

var _renderers = require("./../renderers");

var _validators = require("./../validators");

var CELL_TYPE = 'dropdown';
var _default = {
  editor: (0, _editors.getEditor)(CELL_TYPE),
  // displays small gray arrow on right side of the cell
  renderer: (0, _renderers.getRenderer)('autocomplete'),
  validator: (0, _validators.getValidator)('autocomplete')
};
exports.default = _default;