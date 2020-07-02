"use strict";

exports.__esModule = true;
exports.default = showRowItem;

var _number = require("../../../helpers/number");

var C = _interopRequireWildcard(require("../../../i18n/constants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function showRowItem(hiddenRowsPlugin) {
  var beforeHiddenRows = [];
  var afterHiddenRows = [];
  return {
    key: 'hidden_rows_show',
    name: function name() {
      var selection = this.getSelectedLast();
      var pluralForm = 0;

      if (Array.isArray(selection)) {
        var _selection = _slicedToArray(selection, 3),
            fromRow = _selection[0],
            toRow = _selection[2];

        if (fromRow > toRow) {
          var _ref = [toRow, fromRow];
          fromRow = _ref[0];
          toRow = _ref[1];
        }

        var hiddenRows = 0;

        if (fromRow === toRow) {
          hiddenRows = beforeHiddenRows.length + afterHiddenRows.length;
        } else {
          (0, _number.rangeEach)(fromRow, toRow, function (column) {
            if (hiddenRowsPlugin.isHidden(column)) {
              hiddenRows += 1;
            }
          });
        }

        pluralForm = hiddenRows <= 1 ? 0 : 1;
      }

      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_SHOW_ROW, pluralForm);
    },
    callback: function callback() {
      var _this$getSelectedRang = this.getSelectedRangeLast(),
          from = _this$getSelectedRang.from,
          to = _this$getSelectedRang.to;

      var start = Math.min(from.row, to.row);
      var end = Math.max(from.row, to.row);

      if (start === end) {
        if (beforeHiddenRows.length === start) {
          hiddenRowsPlugin.showRows(beforeHiddenRows);
          beforeHiddenRows.length = 0;
        }

        if (afterHiddenRows.length === this.countSourceRows() - (start + 1)) {
          hiddenRowsPlugin.showRows(afterHiddenRows);
          afterHiddenRows.length = 0;
        }
      } else {
        (0, _number.rangeEach)(start, end, function (row) {
          return hiddenRowsPlugin.showRow(row);
        });
      }

      this.render();
      this.view.wt.wtOverlays.adjustElementsSize(true);
    },
    disabled: false,
    hidden: function hidden() {
      if (!hiddenRowsPlugin.hiddenRows.length || !this.selection.isSelectedByRowHeader()) {
        return true;
      }

      beforeHiddenRows.length = 0;
      afterHiddenRows.length = 0;

      var _this$getSelectedRang2 = this.getSelectedRangeLast(),
          from = _this$getSelectedRang2.from,
          to = _this$getSelectedRang2.to;

      var start = Math.min(from.row, to.row);
      var end = Math.max(from.row, to.row);
      var hiddenInSelection = false;

      if (start === end) {
        var totalRowsLength = this.countSourceRows();
        (0, _number.rangeEach)(0, totalRowsLength, function (i) {
          var partedHiddenLength = beforeHiddenRows.length + afterHiddenRows.length;

          if (partedHiddenLength === hiddenRowsPlugin.hiddenRows.length) {
            return false;
          }

          if (i < start) {
            if (hiddenRowsPlugin.isHidden(i)) {
              beforeHiddenRows.push(i);
            }
          } else if (hiddenRowsPlugin.isHidden(i)) {
            afterHiddenRows.push(i);
          }
        });
        totalRowsLength -= 1;

        if (beforeHiddenRows.length === start && start > 0 || afterHiddenRows.length === totalRowsLength - start && start < totalRowsLength) {
          hiddenInSelection = true;
        }
      } else {
        (0, _number.rangeEach)(start, end, function (i) {
          if (hiddenRowsPlugin.isHidden(i)) {
            hiddenInSelection = true;
            return false;
          }
        });
      }

      return !hiddenInSelection;
    }
  };
}