function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import { addClass, getScrollbarWidth, getScrollTop, getWindowScrollLeft, hasClass, outerHeight, removeClass, resetCssTransform } from './../../../../helpers/dom/element';
import Overlay from './_base';
/**
 * @class BottomOverlay
 */

var BottomOverlay =
/*#__PURE__*/
function (_Overlay) {
  _inherits(BottomOverlay, _Overlay);

  /**
   * @param {Walkontable} wotInstance
   */
  function BottomOverlay(wotInstance) {
    var _this;

    _classCallCheck(this, BottomOverlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BottomOverlay).call(this, wotInstance));
    _this.clone = _this.makeClone(Overlay.CLONE_BOTTOM);
    return _this;
  }
  /**
   *
   */


  _createClass(BottomOverlay, [{
    key: "repositionOverlay",
    value: function repositionOverlay() {
      var scrollbarWidth = getScrollbarWidth();
      var cloneRoot = this.clone.wtTable.holder.parentNode;

      if (this.wot.wtTable.holder.clientHeight === this.wot.wtTable.holder.offsetHeight) {
        scrollbarWidth = 0;
      }

      cloneRoot.style.top = '';
      cloneRoot.style.bottom = "".concat(scrollbarWidth, "px");
    }
    /**
     * Checks if overlay should be fully rendered
     *
     * @returns {Boolean}
     */

  }, {
    key: "shouldBeRendered",
    value: function shouldBeRendered() {
      /* eslint-disable no-unneeded-ternary */
      return this.wot.getSetting('fixedRowsBottom') ? true : false;
    }
    /**
     * Updates the top overlay position
     */

  }, {
    key: "resetFixedPosition",
    value: function resetFixedPosition() {
      if (!this.needFullRender || !this.wot.wtTable.holder.parentNode) {
        // removed from DOM
        return;
      }

      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var headerPosition = 0;
      overlayRoot.style.top = '';

      if (this.wot.wtOverlays.leftOverlay.trimmingContainer === window) {
        var box = this.wot.wtTable.hider.getBoundingClientRect();
        var bottom = Math.ceil(box.bottom);
        var finalLeft;
        var finalBottom;
        var bodyHeight = document.body.offsetHeight;
        finalLeft = this.wot.wtTable.hider.style.left;
        finalLeft = finalLeft === '' ? 0 : finalLeft;

        if (bottom > bodyHeight) {
          finalBottom = bottom - bodyHeight;
        } else {
          finalBottom = 0;
        }

        headerPosition = finalBottom;
        finalBottom += 'px';
        overlayRoot.style.top = '';
        overlayRoot.style.left = finalLeft;
        overlayRoot.style.bottom = finalBottom;
      } else {
        headerPosition = this.getScrollPosition();
        resetCssTransform(overlayRoot);
        this.repositionOverlay();
      }

      this.adjustHeaderBordersPosition(headerPosition);
    }
    /**
     * Sets the main overlay's vertical scroll position
     *
     * @param {Number} pos
     */

  }, {
    key: "setScrollPosition",
    value: function setScrollPosition(pos) {
      if (this.mainTableScrollableElement === window) {
        window.scrollTo(getWindowScrollLeft(), pos);
      } else {
        this.mainTableScrollableElement.scrollTop = pos;
      }
    }
    /**
     * Triggers onScroll hook callback
     */

  }, {
    key: "onScroll",
    value: function onScroll() {
      this.wot.getSetting('onScrollVertically');
    }
    /**
     * Calculates total sum cells height
     *
     * @param {Number} from Row index which calculates started from
     * @param {Number} to Row index where calculation is finished
     * @returns {Number} Height sum
     */

  }, {
    key: "sumCellSizes",
    value: function sumCellSizes(from, to) {
      var row = from;
      var sum = 0;
      var defaultRowHeight = this.wot.wtSettings.settings.defaultRowHeight;

      while (row < to) {
        var height = this.wot.wtTable.getRowHeight(row);
        sum += height === void 0 ? defaultRowHeight : height;
        row += 1;
      }

      return sum;
    }
    /**
     * Adjust overlay root element, childs and master table element sizes (width, height).
     *
     * @param {Boolean} [force=false]
     */

  }, {
    key: "adjustElementsSize",
    value: function adjustElementsSize() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.updateTrimmingContainer();

      if (this.needFullRender || force) {
        this.adjustRootElementSize();
        this.adjustRootChildrenSize();

        if (!force) {
          this.areElementSizesAdjusted = true;
        }
      }
    }
    /**
     * Adjust overlay root element size (width and height).
     */

  }, {
    key: "adjustRootElementSize",
    value: function adjustRootElementSize() {
      var masterHolder = this.wot.wtTable.holder;
      var scrollbarWidth = masterHolder.clientWidth === masterHolder.offsetWidth ? 0 : getScrollbarWidth();
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var overlayRootStyle = overlayRoot.style;

      if (this.trimmingContainer === window) {
        overlayRootStyle.width = '';
      } else {
        overlayRootStyle.width = "".concat(this.wot.wtViewport.getWorkspaceWidth() - scrollbarWidth, "px");
      }

      this.clone.wtTable.holder.style.width = overlayRootStyle.width;
      var tableHeight = outerHeight(this.clone.wtTable.TABLE);
      overlayRootStyle.height = "".concat(tableHeight === 0 ? tableHeight : tableHeight, "px");
    }
    /**
     * Adjust overlay root childs size
     */

  }, {
    key: "adjustRootChildrenSize",
    value: function adjustRootChildrenSize() {
      var scrollbarWidth = getScrollbarWidth();
      this.clone.wtTable.hider.style.width = this.hider.style.width;
      this.clone.wtTable.holder.style.width = this.clone.wtTable.holder.parentNode.style.width;

      if (scrollbarWidth === 0) {
        scrollbarWidth = 30;
      }

      this.clone.wtTable.holder.style.height = "".concat(parseInt(this.clone.wtTable.holder.parentNode.style.height, 10) + scrollbarWidth, "px");
    }
    /**
     * Adjust the overlay dimensions and position
     */

  }, {
    key: "applyToDOM",
    value: function applyToDOM() {
      var total = this.wot.getSetting('totalRows');

      if (!this.areElementSizesAdjusted) {
        this.adjustElementsSize();
      }

      if (typeof this.wot.wtViewport.rowsRenderCalculator.startPosition === 'number') {
        this.spreader.style.top = "".concat(this.wot.wtViewport.rowsRenderCalculator.startPosition, "px");
      } else if (total === 0) {
        // can happen if there are 0 rows
        this.spreader.style.top = '0';
      } else {
        throw new Error('Incorrect value of the rowsRenderCalculator');
      }

      this.spreader.style.bottom = '';

      if (this.needFullRender) {
        this.syncOverlayOffset();
      }
    }
    /**
     * Synchronize calculated left position to an element
     */

  }, {
    key: "syncOverlayOffset",
    value: function syncOverlayOffset() {
      if (typeof this.wot.wtViewport.columnsRenderCalculator.startPosition === 'number') {
        this.clone.wtTable.spreader.style.left = "".concat(this.wot.wtViewport.columnsRenderCalculator.startPosition, "px");
      } else {
        this.clone.wtTable.spreader.style.left = '';
      }
    }
    /**
     * Scrolls vertically to a row
     *
     * @param sourceRow {Number} Row index which you want to scroll to
     * @param [bottomEdge=false] {Boolean} if `true`, scrolls according to the bottom edge (top edge is by default)
     */

  }, {
    key: "scrollTo",
    value: function scrollTo(sourceRow, bottomEdge) {
      var newY = this.getTableParentOffset();
      var sourceInstance = this.wot.cloneSource ? this.wot.cloneSource : this.wot;
      var mainHolder = sourceInstance.wtTable.holder;
      var scrollbarCompensation = 0;

      if (bottomEdge && mainHolder.offsetHeight !== mainHolder.clientHeight) {
        scrollbarCompensation = getScrollbarWidth();
      }

      if (bottomEdge) {
        newY += this.sumCellSizes(0, sourceRow + 1);
        newY -= this.wot.wtViewport.getViewportHeight(); // Fix 1 pixel offset when cell is selected

        newY += 1;
      } else {
        newY += this.sumCellSizes(this.wot.getSetting('fixedRowsBottom'), sourceRow);
      }

      newY += scrollbarCompensation;
      this.setScrollPosition(newY);
    }
    /**
     * Gets table parent top position
     *
     * @returns {Number}
     */

  }, {
    key: "getTableParentOffset",
    value: function getTableParentOffset() {
      if (this.mainTableScrollableElement === window) {
        return this.wot.wtTable.holderOffset.top;
      }

      return 0;
    }
    /**
     * Gets the main overlay's vertical scroll position
     *
     * @returns {Number} Main table's vertical scroll position
     */

  }, {
    key: "getScrollPosition",
    value: function getScrollPosition() {
      return getScrollTop(this.mainTableScrollableElement);
    }
    /**
     * Adds css classes to hide the header border's header (cell-selection border hiding issue)
     *
     * @param {Number} position Header Y position if trimming container is window or scroll top if not
     */

  }, {
    key: "adjustHeaderBordersPosition",
    value: function adjustHeaderBordersPosition(position) {
      if (this.wot.getSetting('fixedRowsBottom') === 0 && this.wot.getSetting('columnHeaders').length > 0) {
        var masterParent = this.wot.wtTable.holder.parentNode;
        var previousState = hasClass(masterParent, 'innerBorderTop');

        if (position) {
          addClass(masterParent, 'innerBorderTop');
        } else {
          removeClass(masterParent, 'innerBorderTop');
        }

        if (!previousState && position || previousState && !position) {
          this.wot.wtOverlays.adjustElementsSize();
        }
      } // nasty workaround for double border in the header, TODO: find a pure-css solution


      if (this.wot.getSetting('rowHeaders').length === 0) {
        var secondHeaderCell = this.clone.wtTable.THEAD.querySelector('th:nth-of-type(2)');

        if (secondHeaderCell) {
          secondHeaderCell.style['border-left-width'] = 0;
        }
      }
    }
  }]);

  return BottomOverlay;
}(Overlay);

Overlay.registerOverlay(Overlay.CLONE_BOTTOM, BottomOverlay);
export default BottomOverlay;