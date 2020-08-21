function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { fastInnerHTML } from '../../../helpers/dom/element';
import { clone } from '../../../helpers/object';

var GhostTable =
/*#__PURE__*/
function () {
  function GhostTable(plugin) {
    _classCallCheck(this, GhostTable);

    this.widths = [];
    this.wrapper = void 0;
    this.headersInstance = plugin;
  }

  _createClass(GhostTable, [{
    key: "setWidths",
    value: function setWidths() {
      this.wrapper = document.createElement('div');
      this.createGhostTable(this.wrapper);
      this.headersInstance.hot.rootElement.appendChild(this.wrapper);
      var columns = this.wrapper.querySelectorAll('tr:last-of-type th');
      var columnsLength = columns.length;

      for (var i = 0; i < columnsLength; i++) {
        this.widths.push(columns[i].offsetWidth);
      }

      this.wrapper.parentNode.removeChild(this.wrapper);
      this.wrapper = null;
      this.headersInstance.hot.render();
    }
  }, {
    key: "createGhostTable",
    value: function createGhostTable(container) {
      var d = document;
      var fragment = d.createDocumentFragment();
      var table = d.createElement('table');
      var lastRowColspan = false;
      var maxRows = this.headersInstance.colspanArray.length;
      var maxCols = this.headersInstance.hot.countCols();
      var lastRowIndex = maxRows - 1;

      for (var row = 0; row < maxRows; row++) {
        var tr = d.createElement('tr');
        lastRowColspan = false;

        for (var col = 0; col < maxCols; col++) {
          var td = d.createElement('th');
          var headerObj = clone(this.headersInstance.colspanArray[row][col]);

          if (headerObj && !headerObj.hidden) {
            if (row === lastRowIndex) {
              if (headerObj.colspan > 1) {
                lastRowColspan = true;
              }
            }

            fastInnerHTML(td, headerObj.label);
            td.colSpan = headerObj.colspan;
            tr.appendChild(td);
          }
        }

        table.appendChild(tr);
      }

      if (lastRowColspan) {
        {
          var _tr = d.createElement('tr');

          for (var _col = 0; _col < maxCols; _col++) {
            var _td = d.createElement('th');

            _tr.appendChild(_td);
          }

          table.appendChild(_tr);
        }
      }

      fragment.appendChild(table);
      container.appendChild(fragment);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.wrapper = null;
      this.widths.length = 0;
    }
  }]);

  return GhostTable;
}();

export default GhostTable;