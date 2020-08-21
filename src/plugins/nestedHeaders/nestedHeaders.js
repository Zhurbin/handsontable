import { addClass, removeClass, fastInnerHTML, empty } from '../../helpers/dom/element';
import { rangeEach } from '../../helpers/number';
import { arrayEach } from '../../helpers/array';
import { objectEach } from '../../helpers/object';
import { registerPlugin } from '../../plugins';
import BasePlugin from '../../plugins/_base';
import { CellCoords } from '../../3rdparty/walkontable/src';

import GhostTable from './utils/ghostTable';

import './nestedHeaders.css';

class NestedHeaders extends BasePlugin {
  constructor(hotInstance) {
    super(hotInstance);
    this.settings = [];
    this.columnHeaderLevelCount = 0;
    this.colspanArray = [];
    this.ghostTable = new GhostTable(this);
  }

  isEnabled() {
    return !!this.hot.getSettings().nestedHeaders;
  }

  enablePlugin() {
    if (this.enabled) {
      return;
    }

    this.settings = this.hot.getSettings().nestedHeaders;

    this.addHook('afterGetColumnHeaderRenderers',
      array => this.onAfterGetColumnHeaderRenderers(array)
    );

    this.addHook('afterInit',
      () => this.onAfterInit()
    );

    this.addHook('afterOnCellMouseDown',
      (event, coords) => this.onAfterOnCellMouseDown(event, coords)
    );

    this.addHook('beforeOnCellMouseOver',
      (event, coords, TD, blockCalculations) => this.onBeforeOnCellMouseOver(event, coords, TD, blockCalculations)
    );

    this.addHook('afterViewportColumnCalculatorOverride',
      calc => this.onAfterViewportColumnCalculatorOverride(calc)
    );

    this.addHook('modifyColWidth',
      (width, column) => this.onModifyColWidth(width, column)
    );

    this.setupColspanArray();

    this.columnHeaderLevelCount = this.hot.view ?
      this.hot.view.wt.getSetting('columnHeaders').length
      :
      0;

    super.enablePlugin();
  }

  disablePlugin() {
    this.clearColspans();
    this.settings = [];
    this.columnHeaderLevelCount = 0;
    this.colspanArray = [];
    this.ghostTable.clear();

    super.disablePlugin();
  }

  updatePlugin() {
    this.disablePlugin();
    this.enablePlugin();

    super.updatePlugin();
    this.ghostTable.setWidths();
  }

  clearColspans() {
    if (!this.hot.view) {
      return;
    }

    const headerLevels = this.hot.view.wt.getSetting('columnHeaders').length;
    const mainHeaders = this.hot.view.wt.wtTable.THEAD;
    const topHeaders = this.hot.view.wt.wtOverlays.topOverlay.clone.wtTable.THEAD;
    const topLeftCornerHeaders = this.hot.view.wt.wtOverlays.topLeftCornerOverlay ?
      this.hot.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.THEAD
      :
      null;

    for (let i = 0; i < headerLevels; i++) {
      const masterLevel = mainHeaders.childNodes[i];

      if (!masterLevel) {
        break;
      }

      const topLevel = topHeaders.childNodes[i];
      const topLeftCornerLevel = topLeftCornerHeaders ?
        topLeftCornerHeaders.childNodes[i]
        :
        null;

      for (let j = 0, masterNodes = masterLevel.childNodes.length; j < masterNodes; j++) {
        masterLevel.childNodes[j].removeAttribute('colspan');

        if (topLevel && topLevel.childNodes[j]) {
          topLevel.childNodes[j].removeAttribute('colspan');
        }

        if (topLeftCornerHeaders && topLeftCornerLevel && topLeftCornerLevel.childNodes[j]) {
          topLeftCornerLevel.childNodes[j].removeAttribute('colspan');
        }
      }
    }
  }

  setupColspanArray() {
    function checkIfExists(array, index) {
      if (!array[index]) {
        array[index] = [];
      }
    }

    objectEach(this.settings, (levelValues, level) => {
      objectEach(levelValues, (val, col, levelValue) => {
        checkIfExists(this.colspanArray, level);

        if (levelValue[col].colspan === void 0) {
          this.colspanArray[level].push({
            label: levelValue[col] || '',
            colspan: 1,
            hidden: false
          });

        } else {
          const colspan = levelValue[col].colspan || 1;

          this.colspanArray[level].push({
            label: levelValue[col].label || '',
            colspan,
            hidden: false
          });

          this.fillColspanArrayWithDummies(colspan, level);
        }
      });
    });
  }

  fillColspanArrayWithDummies(colspan, level) {
    rangeEach(0, colspan - 2, () => {
      this.colspanArray[level].push({
        label: '',
        colspan: 1,
        hidden: true,
      });
    });
  }

  headerRendererFactory(headerRow) {
    const _this = this;

    return function(index, TH) {
      TH.removeAttribute('colspan');
      removeClass(TH, 'hiddenHeader');

      if (_this.colspanArray[headerRow][index] && _this.colspanArray[headerRow][index].colspan) {
        const colspan = _this.colspanArray[headerRow][index].colspan;
        const fixedColumnsLeft = _this.hot.getSettings().fixedColumnsLeft || 0;
        const topLeftCornerOverlay = _this.hot.view.wt.wtOverlays.topLeftCornerOverlay;
        const leftOverlay = _this.hot.view.wt.wtOverlays.leftOverlay;

        const isInTopLeftCornerOverlay = topLeftCornerOverlay ?
          topLeftCornerOverlay.clone.wtTable.THEAD.contains(TH)
          :
          false;
        const isInLeftOverlay = leftOverlay ?
          leftOverlay.clone.wtTable.THEAD.contains(TH)
          :
          false;

        if (colspan > 1) {
          TH.setAttribute('colspan', isInTopLeftCornerOverlay || isInLeftOverlay ? Math.min(colspan, fixedColumnsLeft - index) : colspan);
        }

        if (isInTopLeftCornerOverlay || isInLeftOverlay && index === fixedColumnsLeft - 1) {
          addClass(TH, 'overlayEdge');
        }
      }

      if (_this.colspanArray[headerRow][index] && _this.colspanArray[headerRow][index].hidden) {
        addClass(TH, 'hiddenHeader');
      }

      empty(TH);

      const divEl = document.createElement('DIV');
      addClass(divEl, 'relative');
      const spanEl = document.createElement('SPAN');
      addClass(spanEl, 'colHeader');

      fastInnerHTML(spanEl, _this.colspanArray[headerRow][index] ? _this.colspanArray[headerRow][index].label || '' : '');

      divEl.appendChild(spanEl);

      TH.appendChild(divEl);

      _this.hot.runHooks('afterGetColHeader', index, TH);
    };
  }

  getColspan(row, column) {
    const header = this.colspanArray[this.rowCoordsToLevel(row)][column];

    return header ? header.colspan : 1;
  }

  levelToRowCoords(level) {
    return level - this.columnHeaderLevelCount;
  }

  rowCoordsToLevel(row) {
    return row + this.columnHeaderLevelCount;
  }

  getNestedParent(level, column) {
    if (level < 0) {
      return false;
    }

    const colspan = this.colspanArray[level][column] ? this.colspanArray[level][column].colspan : 1;
    const hidden = this.colspanArray[level][column] ? this.colspanArray[level][column].hidden : false;

    if (colspan > 1 || (colspan === 1 && hidden === false)) {
      return column;

    }
    let parentCol = column - 1;

    do {
      if (this.colspanArray[level][parentCol].colspan > 1) {
        break;
      }

      parentCol -= 1;
    } while (column >= 0);

    return parentCol;
  }

  getChildHeaders(row, column) {
    const level = this.rowCoordsToLevel(row);
    const childColspanLevel = this.colspanArray[level + 1];
    const nestedParentCol = this.getNestedParent(level, column);
    let colspan = this.colspanArray[level][column].colspan;
    const childHeaderRange = [];

    if (!childColspanLevel) {
      return childHeaderRange;
    }

    rangeEach(nestedParentCol, nestedParentCol + colspan - 1, (i) => {
      if (childColspanLevel[i] && childColspanLevel[i].colspan > 1) {
        colspan -= childColspanLevel[i].colspan - 1;
      }

      if (childColspanLevel[i] && !childColspanLevel[i].hidden && childHeaderRange.indexOf(i) === -1) {
        childHeaderRange.push(i);
      }
    });

    return childHeaderRange;
  }

  fillTheRemainingColspans() {
    objectEach(this.settings, (levelValue, level) => {
      rangeEach(this.colspanArray[level].length - 1, this.hot.countCols() - 1, (col) => {
        this.colspanArray[level].push({
          label: levelValue[col] || '',
          colspan: 1,
          hidden: false
        });

      }, true);
    });
  }

  updateHeadersHighlight() {
    const selection = this.hot.getSelectedLast();

    if (selection === void 0) {
      return;
    }

    const wtOverlays = this.hot.view.wt.wtOverlays;
    const selectionByHeader = this.hot.selection.isSelectedByColumnHeader();
    const from = Math.min(selection[1], selection[3]);
    const to = Math.max(selection[1], selection[3]);
    const levelLimit = selectionByHeader ? -1 : this.columnHeaderLevelCount - 1;
    const changes = [];
    const classNameModifier = className => (TH, modifier) => () => modifier(TH, className);
    const highlightHeader = classNameModifier('ht__highlight');
    const activeHeader = classNameModifier('ht__active_highlight');

    rangeEach(from, to, (column) => {
      for (let level = this.columnHeaderLevelCount - 1; level > -1; level--) {
        const visibleColumnIndex = this.getNestedParent(level, column);
        const topTH = wtOverlays.topOverlay ? wtOverlays.topOverlay.clone.wtTable.getColumnHeader(visibleColumnIndex, level) : void 0;
        const topLeftTH = wtOverlays.topLeftCornerOverlay ? wtOverlays.topLeftCornerOverlay.clone.wtTable.getColumnHeader(visibleColumnIndex, level) : void 0;
        const listTH = [topTH, topLeftTH];
        const colspanLen = this.getColspan(level - this.columnHeaderLevelCount, visibleColumnIndex);
        const isInSelection = visibleColumnIndex >= from && (visibleColumnIndex + colspanLen - 1) <= to;

        arrayEach(listTH, (TH) => {
          if (TH === void 0) {
            return false;
          }

          if ((!selectionByHeader && level < levelLimit) || (selectionByHeader && !isInSelection)) {
            changes.push(highlightHeader(TH, removeClass));

            if (selectionByHeader) {
              changes.push(activeHeader(TH, removeClass));
            }

          } else {
            changes.push(highlightHeader(TH, addClass));

            if (selectionByHeader) {
              changes.push(activeHeader(TH, addClass));
            }
          }
        });
      }
    });

    arrayEach(changes, fn => void fn());
    changes.length = 0;
  }

  onAfterViewportColumnCalculatorOverride(calc) {
    let newStartColumn = calc.startColumn;

    rangeEach(0, Math.max(this.columnHeaderLevelCount - 1, 0), (l) => {
      const startColumnNestedParent = this.getNestedParent(l, calc.startColumn);

      if (startColumnNestedParent < calc.startColumn) {
        newStartColumn = Math.min(newStartColumn, startColumnNestedParent);
      }
    });

    calc.startColumn = newStartColumn;
  }

  onAfterOnCellMouseDown(event, coords) {
    if (coords.row < 0) {
      const colspan = this.getColspan(coords.row, coords.col);
      const lastColIndex = coords.col + colspan - 1;

      if (colspan > 1) {
        const lastRowIndex = this.hot.countRows() - 1;

        this.hot.selection.setRangeEnd(new CellCoords(lastRowIndex, lastColIndex));
      }
    }
  }

  onBeforeOnCellMouseOver(event, coords, TD, blockCalculations) {
    if (coords.row >= 0 || coords.col < 0 || !this.hot.view.isMouseDown()) {
      return;
    }

    const { from, to } = this.hot.getSelectedRangeLast();
    const colspan = this.getColspan(coords.row, coords.col);
    const lastColIndex = coords.col + colspan - 1;
    let changeDirection = false;

    if (from.col <= to.col) {
      if ((coords.col < from.col && lastColIndex === to.col) ||
          (coords.col < from.col && lastColIndex < from.col) ||
          (coords.col < from.col && lastColIndex >= from.col && lastColIndex < to.col)) {
        changeDirection = true;
      }
    } else if ((coords.col < to.col && lastColIndex > from.col) ||
               (coords.col > from.col) ||
               (coords.col <= to.col && lastColIndex > from.col) ||
               (coords.col > to.col && lastColIndex > from.col)) {
      changeDirection = true;
    }

    if (changeDirection) {
      [from.col, to.col] = [to.col, from.col];
    }

    if (colspan > 1) {
      blockCalculations.column = true;
      blockCalculations.cell = true;

      const columnRange = [];

      if (from.col === to.col) {
        if (lastColIndex <= from.col && coords.col < from.col) {
          columnRange.push(to.col, coords.col);
        } else {
          columnRange.push(coords.col < from.col ? coords.col : from.col, lastColIndex > to.col ? lastColIndex : to.col);
        }
      }
      if (from.col < to.col) {
        columnRange.push(coords.col < from.col ? coords.col : from.col, lastColIndex);

      }
      if (from.col > to.col) {
        columnRange.push(from.col, coords.col);
      }

      this.hot.selectColumns(...columnRange);
    }
  }

  onAfterInit() {
    this.columnHeaderLevelCount = this.hot.view.wt.getSetting('columnHeaders').length;
    this.fillTheRemainingColspans();
    this.ghostTable.setWidths();
  }

  onAfterGetColumnHeaderRenderers(renderersArray) {
    if (renderersArray) {
      renderersArray.length = 0;

      for (let headersCount = this.colspanArray.length, i = headersCount - 1; i >= 0; i--) {
        renderersArray.push(this.headerRendererFactory(i));
      }
      renderersArray.reverse();
    }

    this.updateHeadersHighlight();
  }

  onModifyColWidth(width, column) {
    const cachedWidth = this.ghostTable.widths[column];

    return width > cachedWidth ? width : cachedWidth;
  }

  destroy() {
    this.settings = null;
    this.columnHeaderLevelCount = null;
    this.colspanArray = null;

    super.destroy();
  }

}

registerPlugin('nestedHeaders', NestedHeaders);

export default NestedHeaders;
