function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

describe('HiddenColumns', function () {
  var id = 'testContainer';

  function getMultilineData(rows, cols) {
    var data = Handsontable.helper.createSpreadsheetData(rows, cols); // Column C

    data[0][2] += '\nline';
    data[1][2] += '\nline\nline';
    return data;
  }

  beforeEach(function () {
    this.$container = $("<div id=\"".concat(id, "\"></div>")).appendTo('body');
  });
  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });
  it('should hide columns if the "hiddenColumns" property is set', function () {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 10),
      hiddenColumns: {
        columns: [2, 4]
      },
      cells: function cells(row, col) {
        var meta = {};

        if (col === 2) {
          meta.type = 'date';
        }

        return meta;
      },
      width: 500,
      height: 300
    });
    expect(hot.getColWidth(1)).toBeGreaterThan(0);
    expect(hot.getColWidth(2)).toEqual(0.1);
    expect(hot.getColWidth(4)).toEqual(0.1);
    expect(hot.getColWidth(5)).toBeGreaterThan(0);
  });
  it('should return to default state after calling the disablePlugin method', function () {
    var hot = handsontable({
      data: getMultilineData(5, 10),
      hiddenColumns: {
        columns: [2, 4]
      },
      cells: function cells(row, col) {
        var meta = {};

        if (col === 2) {
          meta.type = 'date';
        }

        return meta;
      },
      width: 500,
      height: 300
    });
    hot.getPlugin('hiddenColumns').disablePlugin();
    hot.render();
    expect(hot.getColWidth(1)).toBe(50);
    expect(hot.getCell(0, 2).clientHeight).toBe(42);
    expect(hot.getColWidth(2)).toBeAroundValue(51, 4);
    expect(hot.getCell(0, 4).clientHeight).toBe(42);
    expect(hot.getColWidth(4)).toBe(50);
    expect(hot.getColWidth(5)).toBe(50);
  });
  it('should hide columns after calling the enablePlugin method', function () {
    var hot = handsontable({
      data: getMultilineData(5, 10),
      hiddenColumns: {
        columns: [2, 4]
      },
      cells: function cells(row, col) {
        var meta = {};

        if (col === 2) {
          meta.type = 'date';
        }

        return meta;
      },
      width: 500,
      height: 300
    });
    hot.getPlugin('hiddenColumns').disablePlugin();
    hot.render();
    hot.getPlugin('hiddenColumns').enablePlugin();
    hot.render();
    expect(hot.getColWidth(1)).toBe(50);
    expect(hot.getCell(0, 2).clientHeight).toBe(22);
    expect(hot.getColWidth(2)).toBe(0.1);
    expect(hot.getCell(0, 4).clientHeight).toBe(22);
    expect(hot.getColWidth(4)).toBe(0.1);
    expect(hot.getColWidth(5)).toBe(50);
  });
  it('should initialize the plugin after setting it up with the "updateSettings" method', function () {
    var hot = handsontable({
      data: getMultilineData(5, 10),
      colHeaders: true,
      width: 500,
      height: 300
    });
    expect(hot.getPlugin('hiddenColumns').enabled).toEqual(false);
    hot.updateSettings({
      hiddenColumns: {
        columns: [2, 4],
        indicators: true
      }
    });
    expect(hot.getPlugin('hiddenColumns').enabled).toEqual(true);
    expect($('.beforeHiddenColumn').size()).toBeGreaterThan(0);
  });
  it('should hide column after calling the hideColumn method', function () {
    var hot = handsontable({
      data: getMultilineData(5, 10),
      hiddenColumns: true,
      width: 500,
      height: 300
    });
    expect(hot.getCell(0, 2).clientHeight).toBe(42);
    expect(hot.getColWidth(2)).toBe(50);
    hot.getPlugin('hiddenColumns').hideColumn(2);
    hot.render();
    expect(hot.getCell(0, 2).clientHeight).toBe(22);
    expect(hot.getColWidth(2)).toBe(0.1);
  });
  it('should show column after calling the showColumn method', function () {
    var hot = handsontable({
      data: getMultilineData(5, 10),
      hiddenColumns: {
        columns: [2]
      },
      width: 500,
      height: 300
    });
    expect(hot.getCell(0, 2).clientHeight).toBe(22);
    expect(hot.getColWidth(2)).toBe(0.1);
    hot.getPlugin('hiddenColumns').showColumn(2);
    hot.render();
    expect(hot.getCell(0, 2).clientHeight).toBe(42);
    expect(hot.getColWidth(2)).toBe(50);
  });
  it('should show the hidden column indicators if the "indicators" property is set to true', function () {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 10),
      hiddenColumns: {
        columns: [2, 4],
        indicators: true
      },
      colHeaders: true,
      width: 500,
      height: 300
    });
    var tHeadTRs = hot.view.wt.wtTable.THEAD.childNodes[0].childNodes;
    expect(Handsontable.dom.hasClass(tHeadTRs[3], 'afterHiddenColumn')).toBe(true);
    expect(Handsontable.dom.hasClass(tHeadTRs[5], 'afterHiddenColumn')).toBe(true);
    expect(Handsontable.dom.hasClass(tHeadTRs[1], 'beforeHiddenColumn')).toBe(true);
    expect(Handsontable.dom.hasClass(tHeadTRs[3], 'beforeHiddenColumn')).toBe(true);
  });
  it('should not throw any errors, when selecting a whole row with the last column hidden', function () {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      hiddenColumns: {
        columns: [3]
      },
      rowHeaders: true
    });
    var errorThrown = false;

    try {
      hot.selectCell(2, 0, 2, 3);
    } catch (err) {
      errorThrown = true;
    }

    expect(errorThrown).toBe(false);
  });
  describe('copy-paste functionality', function () {
    var DataTransferObject =
    /*#__PURE__*/
    function () {
      function DataTransferObject() {
        _classCallCheck(this, DataTransferObject);

        this.data = {
          'text/plain': '',
          'text/html': ''
        };
      }

      _createClass(DataTransferObject, [{
        key: "getData",
        value: function getData(type) {
          return this.data[type];
        }
      }, {
        key: "setData",
        value: function setData(type, value) {
          this.data[type] = value;
        }
      }]);

      return DataTransferObject;
    }();

    function getClipboardEventMock() {
      var event = {};
      event.clipboardData = new DataTransferObject();

      event.preventDefault = function () {};

      return event;
    }

    it('should allow to copy hidden columns, when "copyPasteEnabled" property is not set', function () {
      var hot = handsontable({
        data: getMultilineData(5, 10),
        hiddenColumns: {
          columns: [2, 4]
        },
        width: 500,
        height: 300
      });
      var copyEvent = getClipboardEventMock('copy');
      var plugin = hot.getPlugin('CopyPaste');
      selectCell(0, 0, 4, 9);
      plugin.setCopyableText();
      plugin.onCopy(copyEvent);
      /* eslint-disable no-tabs */

      expect(copyEvent.clipboardData.getData('text/plain')).toEqual('A1	B1	"C1\n' + 'line"	D1	E1	F1	G1	H1	I1	J1\n' + 'A2	B2	"C2\n' + 'line\n' + 'line"	D2	E2	F2	G2	H2	I2	J2\n' + 'A3	B3	C3	D3	E3	F3	G3	H3	I3	J3\n' + 'A4	B4	C4	D4	E4	F4	G4	H4	I4	J4\n' + 'A5	B5	C5	D5	E5	F5	G5	H5	I5	J5');
    });
    it('should allow to copy hidden columns, when "copyPasteEnabled" property is set to true', function () {
      var hot = handsontable({
        data: getMultilineData(5, 10),
        hiddenColumns: {
          columns: [2, 4],
          copyPasteEnabled: true
        },
        width: 500,
        height: 300
      });
      var copyEvent = getClipboardEventMock('copy');
      var plugin = hot.getPlugin('CopyPaste');
      selectCell(0, 0, 4, 9);
      plugin.setCopyableText();
      plugin.onCopy(copyEvent);
      /* eslint-disable no-tabs */

      expect(copyEvent.clipboardData.getData('text/plain')).toEqual('A1	B1	"C1\n' + 'line"	D1	E1	F1	G1	H1	I1	J1\n' + 'A2	B2	"C2\n' + 'line\n' + 'line"	D2	E2	F2	G2	H2	I2	J2\n' + 'A3	B3	C3	D3	E3	F3	G3	H3	I3	J3\n' + 'A4	B4	C4	D4	E4	F4	G4	H4	I4	J4\n' + 'A5	B5	C5	D5	E5	F5	G5	H5	I5	J5');
    });
    it('should skip hidden columns, while copying data, when "copyPasteEnabled" property is set to false', function () {
      var hot = handsontable({
        data: getMultilineData(5, 10),
        hiddenColumns: {
          columns: [2, 4],
          copyPasteEnabled: false
        },
        width: 500,
        height: 300
      });
      var copyEvent = getClipboardEventMock('copy');
      var plugin = hot.getPlugin('CopyPaste');
      selectCell(0, 0, 4, 9);
      plugin.setCopyableText();
      plugin.onCopy(copyEvent);
      /* eslint-disable no-tabs */

      expect(copyEvent.clipboardData.getData('text/plain')).toEqual('A1	B1	D1	F1	G1	H1	I1	J1\n' + 'A2	B2	D2	F2	G2	H2	I2	J2\n' + 'A3	B3	D3	F3	G3	H3	I3	J3\n' + 'A4	B4	D4	F4	G4	H4	I4	J4\n' + 'A5	B5	D5	F5	G5	H5	I5	J5');
    });
    it('should skip hidden columns, while pasting data, when "copyPasteEnabled" property is set to false', function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 10),
        hiddenColumns: {
          columns: [2, 4],
          copyPasteEnabled: false
        },
        width: 500,
        height: 300
      });
      selectCell(0, 0);
      var plugin = hot.getPlugin('CopyPaste');
      plugin.paste('a\tb\tc\td\te\nf\tg\th\ti\tj');
      expect(getDataAtRow(0)).toEqual(['a', 'b', 'C1', 'c', 'E1', 'd', 'e', 'H1', 'I1', 'J1']);
      expect(getDataAtRow(1)).toEqual(['f', 'g', 'C2', 'h', 'E2', 'i', 'j', 'H2', 'I2', 'J2']);
    });
  });
  describe('navigation', function () {
    it('should ignore hidden columns while navigating by arrow keys', function () {
      handsontable({
        data: getMultilineData(5, 10),
        hiddenColumns: {
          columns: [2, 4]
        },
        width: 500,
        height: 300
      });
      selectCell(0, 0, 0, 0);
      keyDownUp(Handsontable.helper.KEY_CODES.ARROW_RIGHT);
      expect(getSelected()).toEqual([[0, 1, 0, 1]]);
      keyDownUp(Handsontable.helper.KEY_CODES.ARROW_RIGHT);
      expect(getSelected()).toEqual([[0, 3, 0, 3]]);
      keyDownUp(Handsontable.helper.KEY_CODES.ARROW_RIGHT);
      expect(getSelected()).toEqual([[0, 5, 0, 5]]);
    });
  });
  describe('context-menu', function () {
    it('should be visible "hide column" on context menu when column is selected by header', function () {
      handsontable({
        data: getMultilineData(5, 10),
        hiddenColumns: true,
        width: 500,
        height: 300,
        contextMenu: ['hidden_columns_hide', 'hidden_columns_show'],
        colHeaders: true
      });
      var header = $('.ht_clone_top tr:eq(0) th:eq(0)');
      header.simulate('mousedown');
      header.simulate('mouseup');
      contextMenu();
      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');
      expect(actions.text()).toEqual('Hide column');
    });
    it('should be NOT visible "hide column" on context menu when column is selected by header', function () {
      handsontable({
        data: getMultilineData(5, 10),
        hiddenColumns: true,
        width: 500,
        height: 300,
        contextMenu: ['hidden_columns_hide', 'hidden_columns_show'],
        colHeaders: true
      });
      selectCell(0, 0);
      contextMenu();
      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');
      expect(actions.length).toEqual(1);
      expect(actions.text()).toEqual(['No available options'].join(''));
    });
    it('should hide selected columns by "Hide column" in context menu', function () {
      var hot = handsontable({
        data: getMultilineData(5, 10),
        hiddenColumns: true,
        width: 500,
        height: 300,
        contextMenu: ['hidden_columns_hide', 'hidden_columns_show'],
        colHeaders: true
      });
      var header = $('.ht_clone_top tr:eq(0)');
      header.find('th:eq(3)').simulate('mousedown');
      header.find('th:eq(4)').simulate('mouseover');
      header.find('th:eq(4)').simulate('mouseup');
      contextMenu();
      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');
      actions.simulate('mousedown').simulate('mouseup');
      expect(hot.getColWidth(3)).toBe(0.1);
      expect(hot.getColWidth(4)).toBe(0.1);
    });
    it('should show hidden columns by context menu', function () {
      var hot = handsontable({
        data: getMultilineData(5, 10),
        hiddenColumns: {
          columns: [2, 3],
          indicators: true
        },
        width: 500,
        height: 300,
        contextMenu: ['hidden_columns_show'],
        colHeaders: true
      });
      var header = $('.ht_clone_top tr:eq(0)');
      header.find('th:eq(1)').simulate('mousedown');
      header.find('th:eq(4)').simulate('mouseover');
      header.find('th:eq(4)').simulate('mouseup');
      contextMenu();
      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');
      actions.simulate('mousedown').simulate('mouseup');
      expect(hot.getColWidth(2)).toBe(50);
      expect(hot.getColWidth(3)).toBe(50);
    });
  });
  describe('manualColumnMove', function () {
    it('should properly render hidden ranges after moving action', function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 10),
        hiddenColumns: {
          columns: [3]
        },
        width: 500,
        height: 300,
        manualColumnMove: true
      });
      var hiddenColumns = hot.getPlugin('hiddenColumns');
      var manualColumnMove = hot.getPlugin('manualColumnMove');
      manualColumnMove.moveColumns([0, 1], 4);
      hot.render();
      expect(hiddenColumns.hiddenColumns[0]).toEqual(3);
      expect(hot.getColWidth(1)).toEqual(0.1);
    });
  });
  describe('plugin hooks', function () {
    describe('beforeHideColumns', function () {
      it('should fire the `beforeHideColumns` hook before hiding a single column by plugin API', function () {
        var beforeHideColumnsHookCallback = jasmine.createSpy('beforeHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          beforeHideColumns: beforeHideColumnsHookCallback
        });
        getPlugin('hiddenColumns').hideColumn(2);
        expect(beforeHideColumnsHookCallback).toHaveBeenCalledWith([], [2], true, void 0, void 0, void 0);
      });
      it('should fire the `beforeHideColumns` hook before hiding multiple columns by plugin API', function () {
        var beforeHideColumnsHookCallback = jasmine.createSpy('beforeHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          beforeHideColumns: beforeHideColumnsHookCallback
        });
        getPlugin('hiddenColumns').hideColumns([2, 3, 4]);
        expect(beforeHideColumnsHookCallback).toHaveBeenCalledWith([], [2, 3, 4], true, void 0, void 0, void 0);
      });
      it('should be possible to cancel the hiding action by returning `false` from the `beforeHideColumns` hook', function () {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          beforeHideColumns: function beforeHideColumns() {
            return false;
          }
        });
        getPlugin('hiddenColumns').hideColumn(2);
        expect(getPlugin('hiddenColumns').isHidden(2)).toBeFalsy();
      });
      it('should not perform hiding and return `false` as the third parameter of the `beforeHideColumns` hook' + ' if any of the provided columns is out of scope of the table', function () {
        var beforeHideColumnsHookCallback = jasmine.createSpy('beforeHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          beforeHideColumns: beforeHideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.hideColumns([0, 5, 10, 15]);
        expect(beforeHideColumnsHookCallback).toHaveBeenCalledWith([], [], false, void 0, void 0, void 0);
        expect(plugin.isHidden(0)).toBeFalsy();
        expect(plugin.isHidden(5)).toBeFalsy();
        expect(plugin.isHidden(10)).toBeFalsy();
      });
      it('should not perform hiding and return `false` as the third parameter of the `beforeHideColumns` hook' + ' if any of the provided columns is not integer', function () {
        var beforeHideColumnsHookCallback = jasmine.createSpy('beforeHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          beforeHideColumns: beforeHideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.hideColumns([0, 5, 1.1]);
        expect(beforeHideColumnsHookCallback).toHaveBeenCalledWith([], [], false, void 0, void 0, void 0);
        expect(plugin.isHidden(0)).toBeFalsy();
        expect(plugin.isHidden(5)).toBeFalsy();
      });
    });
    describe('afterHideColumns', function () {
      it('should fire the `afterHideColumns` hook after hiding a single column by plugin API', function () {
        var afterHideColumnsHookCallback = jasmine.createSpy('afterHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          afterHideColumns: afterHideColumnsHookCallback
        });
        getPlugin('hiddenColumns').hideColumn(2);
        expect(afterHideColumnsHookCallback).toHaveBeenCalledWith([], [2], true, true, void 0, void 0);
      });
      it('should fire the `afterHideColumns` hook after hiding multiple columns by plugin API', function () {
        var afterHideColumnsHookCallback = jasmine.createSpy('afterHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          afterHideColumns: afterHideColumnsHookCallback
        });
        getPlugin('hiddenColumns').hideColumns([2, 3, 4]);
        expect(afterHideColumnsHookCallback).toHaveBeenCalledWith([], [2, 3, 4], true, true, void 0, void 0);
      });
      it('it should NOT fire the `afterHideColumns` hook, if the `beforeHideColumns` hook returned false', function () {
        var afterHideColumnsHookCallback = jasmine.createSpy('afterHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          beforeHideColumns: function beforeHideColumns() {
            return false;
          },
          afterHideColumns: afterHideColumnsHookCallback
        });
        getPlugin('hiddenColumns').hideColumns([2, 3, 4]);
        expect(afterHideColumnsHookCallback).not.toHaveBeenCalled();
      });
      it('should return `false` as the fourth parameter, if the hiding action did not change the state of the hiddenColumns plugin', function () {
        var afterHideColumnsHookCallback = jasmine.createSpy('afterHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: {
            columns: [0, 5]
          },
          afterHideColumns: afterHideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.hideColumns([0, 5]);
        expect(afterHideColumnsHookCallback).toHaveBeenCalledWith([0, 5], [0, 5], true, false, void 0, void 0);
      });
      it('should return `true` as the third and fourth parameter, if the hiding action changed the state of the hiddenColumns plugin', function () {
        var afterHideColumnsHookCallback = jasmine.createSpy('afterHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: {
            columns: [0, 5]
          },
          afterHideColumns: afterHideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.hideColumns([0, 5, 6]);
        expect(afterHideColumnsHookCallback).toHaveBeenCalledWith([0, 5], [0, 5, 6], true, true, void 0, void 0);
      });
      it('should not perform hiding and return `false` as the third and fourth parameter of the `afterHideColumns` hook' + ' if any of the provided columns is out of scope of the table', function () {
        var afterHideColumnsHookCallback = jasmine.createSpy('afterHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          afterHideColumns: afterHideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.hideColumns([0, 5, 10, 15]);
        expect(afterHideColumnsHookCallback).toHaveBeenCalledWith([], [], false, false, void 0, void 0);
        expect(plugin.isHidden(0)).toBeFalsy();
        expect(plugin.isHidden(5)).toBeFalsy();
        expect(plugin.isHidden(10)).toBeFalsy();
      });
      it('should not perform hiding and return `false` as the third and fourth parameter of the `afterHideColumns` hook' + ' if any of the provided columns is not integer', function () {
        var afterHideColumnsHookCallback = jasmine.createSpy('afterHideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          afterHideColumns: afterHideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.hideColumns([0, 5, 1.1]);
        expect(afterHideColumnsHookCallback).toHaveBeenCalledWith([], [], false, false, void 0, void 0);
        expect(plugin.isHidden(0)).toBeFalsy();
        expect(plugin.isHidden(5)).toBeFalsy();
      });
    });
    describe('beforeUnhideColumns', function () {
      it('should fire the `beforeUnhideColumns` hook before unhiding a single, previously hidden column', function () {
        var beforeUnhideColumnsHookCallback = jasmine.createSpy('beforeUnhideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: {
            columns: [2]
          },
          beforeUnhideColumns: beforeUnhideColumnsHookCallback
        });
        getPlugin('hiddenColumns').showColumn(2);
        expect(beforeUnhideColumnsHookCallback).toHaveBeenCalledWith([2], [], true, void 0, void 0, void 0);
      });
      it('should fire the `beforeUnhideColumns` hook before unhiding the multiple, previously hidden columns ', function () {
        var beforeUnhideColumnsHookCallback = jasmine.createSpy('beforeUnhideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: {
            columns: [2, 3, 4]
          },
          beforeUnhideColumns: beforeUnhideColumnsHookCallback
        });
        getPlugin('hiddenColumns').showColumns([2, 3, 4]);
        expect(beforeUnhideColumnsHookCallback).toHaveBeenCalledWith([2, 3, 4], [], true, void 0, void 0, void 0);
      });
      it('should be possible to cancel the unhiding action by returning `false` from the `beforeUnhideColumns` hook', function () {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: {
            columns: [2, 3, 4]
          },
          beforeUnhideColumns: function beforeUnhideColumns() {
            return false;
          }
        });
        getPlugin('hiddenColumns').showColumn(2);
        expect(getPlugin('hiddenColumns').isHidden(2)).toBeTruthy();
      });
      it('should not perform unhiding and return `false` as the third parameter of the `beforeUnhideColumns` hook' + ' if any of the provided columns is out of scope of the table', function () {
        var beforeUnhideColumnsHookCallback = jasmine.createSpy('beforeUnhideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: {
            columns: [0, 5]
          },
          beforeUnhideColumns: beforeUnhideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.showColumns([0, 5, 10, 15]);
        expect(beforeUnhideColumnsHookCallback).toHaveBeenCalledWith([0, 5], [0, 5], false, void 0, void 0, void 0);
        expect(plugin.isHidden(0)).toBeTruthy();
        expect(plugin.isHidden(5)).toBeTruthy();
      });
      it('should not perform unhiding and return `false` as the third parameter of the `beforeUnhideColumns` hook' + ' if any of the provided columns is out of scope of the table', function () {
        var beforeUnhideColumnsHookCallback = jasmine.createSpy('beforeUnhideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: {
            columns: [0, 5]
          },
          beforeUnhideColumns: beforeUnhideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.showColumns([0, 5, 10, 15]);
        expect(beforeUnhideColumnsHookCallback).toHaveBeenCalledWith([0, 5], [0, 5], false, void 0, void 0, void 0);
        expect(plugin.isHidden(0)).toBeTruthy();
        expect(plugin.isHidden(5)).toBeTruthy();
      });
    });
    describe('afterUnhideColumns', function () {
      it('should fire the `afterUnhideColumns` hook after unhiding a previously hidden single column', function () {
        var afterUnhideColumnsHookCallback = jasmine.createSpy('afterUnhideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: {
            columns: [2]
          },
          afterUnhideColumns: afterUnhideColumnsHookCallback
        });
        getPlugin('hiddenColumns').showColumn(2);
        expect(afterUnhideColumnsHookCallback).toHaveBeenCalledWith([2], [], true, true, void 0, void 0);
      });
      it('should fire the `afterUnhideColumns` hook after unhiding a multiple, previously hidden columns', function () {
        var afterUnhideColumnsHookCallback = jasmine.createSpy('afterUnhideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: {
            columns: [2, 3, 4]
          },
          afterUnhideColumns: afterUnhideColumnsHookCallback
        });
        getPlugin('hiddenColumns').showColumns([2, 3, 4]);
        expect(afterUnhideColumnsHookCallback).toHaveBeenCalledWith([2, 3, 4], [], true, true, void 0, void 0);
      });
      it('it should NOT fire the `afterUnhideColumns` hook, if the `beforeUnhideColumns` hook returned false', function () {
        var afterUnhideColumnsHookCallback = jasmine.createSpy('afterUnhideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          beforeUnhideColumns: function beforeUnhideColumns() {
            return false;
          },
          afterUnhideColumns: afterUnhideColumnsHookCallback
        });
        getPlugin('hiddenColumns').showColumns([2, 3, 4]);
        expect(afterUnhideColumnsHookCallback).not.toHaveBeenCalled();
      });
      it('should return `false` as the fourth parameter, if the unhiding action did not change the state of the hiddenColumns plugin', function () {
        var afterUnhideColumnsHookCallback = jasmine.createSpy('afterUnhideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: true,
          afterUnhideColumns: afterUnhideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.showColumns([0, 5]);
        expect(afterUnhideColumnsHookCallback).toHaveBeenCalledWith([], [], true, false, void 0, void 0);
      });
      it('should return `true` as the fourth parameter, if the unhiding action changed the state of the hiddenColumns plugin', function () {
        var afterUnhideColumnsHookCallback = jasmine.createSpy('afterUnhideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          hiddenColumns: {
            columns: [0, 5]
          },
          afterUnhideColumns: afterUnhideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.showColumns([0, 5, 6]);
        expect(afterUnhideColumnsHookCallback).toHaveBeenCalledWith([0, 5], [], true, true, void 0, void 0);
      });
      it('should not perform hiding and return `false` as the third and fourth parameter of the `afterUnhideColumns` hook' + ' if any of the provided columns is not integer', function () {
        var afterUnhideColumnsHookCallback = jasmine.createSpy('afterUnhideColumnsHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 7),
          hiddenColumns: {
            columns: [0, 5]
          },
          afterUnhideColumns: afterUnhideColumnsHookCallback
        });
        var plugin = getPlugin('hiddenColumns');
        plugin.showColumns([0, 5, 1.1]);
        expect(afterUnhideColumnsHookCallback).toHaveBeenCalledWith([0, 5], [0, 5], false, false, void 0, void 0);
        expect(plugin.isHidden(0)).toBeTruthy();
        expect(plugin.isHidden(5)).toBeTruthy();
      });
    });
  });
});