"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

describe('TrimRows', function () {
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
  it('should trim rows defined in `trimRows` property', function () {
    handsontable({
      data: Handsontable.helper.createSpreadsheetData(10, 10),
      trimRows: [2, 6, 7],
      cells: function cells(row) {
        var meta = {};

        if (row === 2) {
          meta.type = 'date';
        }

        return meta;
      },
      width: 500,
      height: 300
    });
    expect(getDataAtCell(0, 0)).toBe('A1');
    expect(getDataAtCell(1, 0)).toBe('A2');
    expect(getDataAtCell(2, 0)).toBe('A4');
    expect(getDataAtCell(3, 0)).toBe('A5');
    expect(getDataAtCell(4, 0)).toBe('A6');
    expect(getDataAtCell(5, 0)).toBe('A9');
    expect(getDataAtCell(6, 0)).toBe('A10');
    expect(getCellMeta(0, 0).type).toBe('text');
    expect(getCellMeta(1, 0).type).toBe('text');
    expect(getCellMeta(2, 0).type).toBe('text');
    expect(getCellMeta(3, 0).type).toBe('text');
    expect(getCellMeta(4, 0).type).toBe('text');
    expect(getCellMeta(5, 0).type).toBe('text');
    expect(getCellMeta(6, 0).type).toBe('text');
  });
  it('should trim rows after re-load data calling loadData method', function () {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(10, 10),
      trimRows: [0, 2],
      width: 500,
      height: 300
    });
    hot.loadData(Handsontable.helper.createSpreadsheetData(5, 5));
    expect(getDataAtCell(0, 0)).toBe('A2');
    expect(getDataAtCell(1, 0)).toBe('A4');
    expect(getDataAtCell(2, 0)).toBe('A5');
    expect(getDataAtCell(3, 0)).toBe(null);
    expect(getDataAtCell(4, 0)).toBe(null);
  });
  it('should return to default state after call disablePlugin method', function () {
    var hot = handsontable({
      data: getMultilineData(10, 10),
      trimRows: [2, 6, 7],
      width: 500,
      height: 300
    });
    hot.getPlugin('trimRows').disablePlugin();
    hot.render();
    expect(getDataAtCell(0, 0)).toBe('A1');
    expect(getDataAtCell(1, 0)).toBe('A2');
    expect(getDataAtCell(2, 0)).toBe('A3');
    expect(getDataAtCell(3, 0)).toBe('A4');
    expect(getDataAtCell(4, 0)).toBe('A5');
    expect(getDataAtCell(5, 0)).toBe('A6');
    expect(getDataAtCell(6, 0)).toBe('A7');
  });
  it('should trim rows after call enablePlugin method', function () {
    var hot = handsontable({
      data: getMultilineData(10, 10),
      trimRows: [2, 6, 7],
      width: 500,
      height: 300
    });
    hot.getPlugin('hiddenRows').disablePlugin();
    hot.getPlugin('hiddenRows').enablePlugin();
    hot.render();
    expect(getDataAtCell(0, 0)).toBe('A1');
    expect(getDataAtCell(1, 0)).toBe('A2');
    expect(getDataAtCell(2, 0)).toBe('A4');
    expect(getDataAtCell(3, 0)).toBe('A5');
    expect(getDataAtCell(4, 0)).toBe('A6');
    expect(getDataAtCell(5, 0)).toBe('A9');
    expect(getDataAtCell(6, 0)).toBe('A10');
  });
  it('should trim row after call trimRow method', function () {
    var hot = handsontable({
      data: getMultilineData(5, 10),
      trimRows: true,
      width: 500,
      height: 300
    });
    expect(getDataAtCell(1, 0)).toBe('A2');
    hot.getPlugin('trimRows').trimRow(1);
    hot.render();
    expect(getDataAtCell(1, 0)).toBe('A3');
  });
  it('should untrim row after call untrimRow method', function () {
    var hot = handsontable({
      data: getMultilineData(5, 10),
      trimRows: [1],
      width: 500,
      height: 300
    });
    expect(getDataAtCell(1, 0)).toBe('A3');
    hot.getPlugin('trimRows').untrimRow(1);
    hot.render();
    expect(getDataAtCell(1, 0)).toBe('A2');
  });
  it('should trim big data set', function () {
    handsontable({
      data: Handsontable.helper.createSpreadsheetData(1000, 5),
      // leave first row and last 3 rows
      trimRows: Array.apply(void 0, _toConsumableArray(Array(996))).map(function (v, i) {
        return i + 1;
      }),
      width: 500,
      height: 300
    });
    expect(getDataAtCell(0, 0)).toBe('A1');
    expect(getDataAtCell(1, 0)).toBe('A998');
    expect(getDataAtCell(2, 0)).toBe('A999');
    expect(getDataAtCell(3, 0)).toBe('A1000');
    expect(getDataAtCell(4, 0)).toBe(null);
  });
  it('should remove correct rows', function () {
    handsontable({
      data: getMultilineData(5, 10),
      trimRows: [1],
      width: 500,
      height: 300
    });
    alter('remove_row', 0, 2);
    expect(getDataAtCell(0, 0)).toBe('A4');
    expect(getDataAtCell(1, 0)).toBe('A5');
    expect(getDataAtCell(2, 0)).toBe(null);
  });
  it('should remove correct rows after inserting new ones', function () {
    handsontable({
      data: getMultilineData(6, 10),
      trimRows: [1, 4],
      width: 500,
      height: 300
    });
    alter('insert_row', 1);
    alter('insert_row', 3);
    alter('remove_row', 0, 3);
    expect(getDataAtCell(0, 0)).toBe(null);
    expect(getDataAtCell(1, 0)).toBe('A4');
    expect(getDataAtCell(2, 0)).toBe('A6');
    expect(getDataAtCell(3, 0)).toBe(null);
  });
  it('should update trimmed row indexes after rows removal', function () {
    handsontable({
      data: Handsontable.helper.createSpreadsheetData(10, 1),
      trimRows: true,
      manualRowMove: [4, 0, 8, 5, 2, 6, 1, 7, 3, 9]
    });
    var plugin = getPlugin('trimRows');
    plugin.trimRows([1, 7, 3]); // physical row indexes after move

    alter('remove_row', 2, 3); // visual row indexes

    expect(plugin.isTrimmed(1)).toBeTruthy();
    expect(plugin.isTrimmed(5)).toBeTruthy(); // 7 -> 5

    expect(plugin.isTrimmed(2)).toBeTruthy(); // 3 -> 2

    expect(plugin.isTrimmed(7)).toBeFalsy();
    expect(plugin.isTrimmed(3)).toBeFalsy();
  });
  it('should update trimmed row indexes after insertion', function () {
    handsontable({
      data: Handsontable.helper.createSpreadsheetData(10, 1),
      trimRows: true,
      manualRowMove: [4, 0, 8, 5, 2, 6, 1, 7, 3, 9]
    });
    var plugin = getPlugin('trimRows');
    plugin.trimRows([1, 7, 3]); // physical row indexes after move

    alter('insert_row', 2, 3); // visual row indexes

    expect(plugin.isTrimmed(1)).toBeTruthy();
    expect(plugin.isTrimmed(10)).toBeTruthy(); // 7 -> 10

    expect(plugin.isTrimmed(6)).toBeTruthy(); // 3 -> 6

    expect(plugin.isTrimmed(7)).toBeFalsy();
    expect(plugin.isTrimmed(3)).toBeFalsy();
  });
  it('should clear cache after loading new data by `loadData` function, when plugin `trimRows` is enabled #92', function (done) {
    var _this = this;

    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      trimRows: true
    });
    hot.loadData(Handsontable.helper.createSpreadsheetData(10, 10));
    setTimeout(function () {
      expect(_this.$container.find('td').length).toEqual(100);
      done();
    }, 100);
  });
  describe('plugin hooks', function () {
    it('should not affect `afterValidate` hook #11',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 2),
        trimRows: true,
        cells: function cells() {
          return {
            type: 'numeric'
          };
        }
      });
      hot.populateFromArray(5, 1, [['A1', 'A2'], ['B1', 'B2'], ['C1', 'C2'], ['D1', 'D2'], ['E1', 'E2']]);
      yield sleep(150);
      var $addedCell = $(getCell(5, 1));
      expect($addedCell.hasClass('htInvalid')).toEqual(true);
    }));
    describe('beforeTrimRow', function () {
      it('should fire the `beforeTrimRow` hook before trimming a single row by plugin API', function () {
        var beforeTrimRowHookCallback = jasmine.createSpy('beforeTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          beforeTrimRow: beforeTrimRowHookCallback
        });
        getPlugin('trimRows').trimRow(2);
        expect(beforeTrimRowHookCallback).toHaveBeenCalledWith([], [2], true, void 0, void 0, void 0);
      });
      it('should fire the `beforeTrimRow` hook before hiding multiple rows by plugin API', function () {
        var beforeTrimRowHookCallback = jasmine.createSpy('beforeTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          beforeTrimRow: beforeTrimRowHookCallback
        });
        getPlugin('trimRows').trimRows([2, 3, 4]);
        expect(beforeTrimRowHookCallback).toHaveBeenCalledWith([], [2, 3, 4], true, void 0, void 0, void 0);
      });
      it('should be possible to cancel the trimming action by returning `false` from the `beforeTrimRow` hook', function () {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          beforeTrimRow: function beforeTrimRow() {
            return false;
          }
        });
        getPlugin('trimRows').trimRow(2);
        expect(getPlugin('trimRows').isTrimmed(2)).toBeFalsy();
      });
      it('should not perform trimming and return `false` as the third parameter of the `beforeTrimRow` hook' + ' if any of the provided rows is out of scope of the table', function () {
        var beforeTrimRowHookCallback = jasmine.createSpy('beforeTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          beforeTrimRow: beforeTrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.trimRows([0, 5, 10, 15]);
        expect(beforeTrimRowHookCallback).toHaveBeenCalledWith([], [], false, void 0, void 0, void 0);
        expect(plugin.isTrimmed(0)).toBeFalsy();
        expect(plugin.isTrimmed(5)).toBeFalsy();
        expect(plugin.isTrimmed(10)).toBeFalsy();
      });
      it('should not perform trimming and return `false` as the third parameter of the `beforeTrimRow` hook' + ' if any of the provided rows is not integer', function () {
        var beforeTrimRowHookCallback = jasmine.createSpy('beforeTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          beforeTrimRow: beforeTrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.trimRows([0, 5, 1.1]);
        expect(beforeTrimRowHookCallback).toHaveBeenCalledWith([], [], false, void 0, void 0, void 0);
        expect(plugin.isTrimmed(0)).toBeFalsy();
        expect(plugin.isTrimmed(5)).toBeFalsy();
      });
    });
    describe('afterTrimRow', function () {
      it('should fire the `afterTrimRow` hook after trimming a single row by plugin API', function () {
        var afterTrimRowHookCallback = jasmine.createSpy('afterTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          afterTrimRow: afterTrimRowHookCallback
        });
        getPlugin('trimRows').trimRow(2);
        expect(afterTrimRowHookCallback).toHaveBeenCalledWith([], [2], true, true, void 0, void 0);
      });
      it('should fire the `afterTrimRow` hook after trimming multiple rows by plugin API', function () {
        var afterTrimRowHookCallback = jasmine.createSpy('afterTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          afterTrimRow: afterTrimRowHookCallback
        });
        getPlugin('trimRows').trimRows([2, 3, 4]);
        expect(afterTrimRowHookCallback).toHaveBeenCalledWith([], [2, 3, 4], true, true, void 0, void 0);
      });
      it('it should NOT fire the `afterTrimRow` hook, if the `beforeTrimRow` hook returned false', function () {
        var afterTrimRowHookCallback = jasmine.createSpy('afterTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          beforeTrimRow: function beforeTrimRow() {
            return false;
          },
          afterTrimRow: afterTrimRowHookCallback
        });
        getPlugin('trimRows').trimRows([2, 3, 4]);
        expect(afterTrimRowHookCallback).not.toHaveBeenCalled();
      });
      it('should return `false` as the fourth parameter, if the trimming action did not change the state of the trimRows plugin', function () {
        var afterTrimRowHookCallback = jasmine.createSpy('afterTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: [0, 5],
          afterTrimRow: afterTrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.trimRows([0, 5]);
        expect(afterTrimRowHookCallback).toHaveBeenCalledWith([0, 5], [0, 5], true, false, void 0, void 0);
      });
      it('should return `true` as the third and fourth parameter, if the trimming action changed the state of the trimRows plugin', function () {
        var afterTrimRowHookCallback = jasmine.createSpy('afterTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: [0, 5],
          afterTrimRow: afterTrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.trimRows([0, 5, 6]);
        expect(afterTrimRowHookCallback).toHaveBeenCalledWith([0, 5], [0, 5, 6], true, true, void 0, void 0);
      });
      it('should not perform trimming and return `false` as the third and fourth parameter of the `afterTrimRow` hook' + ' if any of the provided rows is out of scope of the table', function () {
        var afterTrimRowHookCallback = jasmine.createSpy('afterTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          afterTrimRow: afterTrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.trimRows([0, 5, 10, 15]);
        expect(afterTrimRowHookCallback).toHaveBeenCalledWith([], [], false, false, void 0, void 0);
        expect(plugin.isTrimmed(0)).toBeFalsy();
        expect(plugin.isTrimmed(5)).toBeFalsy();
        expect(plugin.isTrimmed(10)).toBeFalsy();
      });
      it('should not perform trimming and return `false` as the third and fourth parameter of the `afterTrimRow` hook' + ' if any of the provided rows is not integer', function () {
        var afterTrimRowHookCallback = jasmine.createSpy('afterTrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          afterTrimRow: afterTrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.trimRows([0, 5, 1.1]);
        expect(afterTrimRowHookCallback).toHaveBeenCalledWith([], [], false, false, void 0, void 0);
        expect(plugin.isTrimmed(0)).toBeFalsy();
        expect(plugin.isTrimmed(5)).toBeFalsy();
      });
    });
    describe('beforeUntrimRow', function () {
      it('should fire the `beforeUntrimRow` hook before untrimming a single, previously trimmed row', function () {
        var beforeUntrimRowHookCallback = jasmine.createSpy('beforeUntrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: [2],
          beforeUntrimRow: beforeUntrimRowHookCallback
        });
        getPlugin('trimRows').untrimRow(2);
        expect(beforeUntrimRowHookCallback).toHaveBeenCalledWith([2], [], true, void 0, void 0, void 0);
      });
      it('should fire the `beforeUntrimRow` hook before untrimming the multiple, previously trimmed rows ', function () {
        var beforeUntrimRowHookCallback = jasmine.createSpy('beforeUntrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: [2, 3, 4],
          beforeUntrimRow: beforeUntrimRowHookCallback
        });
        getPlugin('trimRows').untrimRows([2, 3, 4]);
        expect(beforeUntrimRowHookCallback).toHaveBeenCalledWith([2, 3, 4], [], true, void 0, void 0, void 0);
      });
      it('should be possible to cancel the untrimming action by returning `false` from the `beforeUntrimRow` hook', function () {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: [2, 3, 4],
          beforeUntrimRow: function beforeUntrimRow() {
            return false;
          }
        });
        getPlugin('trimRows').untrimRow(2);
        expect(getPlugin('trimRows').isTrimmed(2)).toBeTruthy();
      });
      it('should not perform untrimming and return `false` as the third parameter of the `beforeUntrimRow` hook' + ' if any of the provided rows is out of scope of the table', function () {
        var beforeUntrimRowHookCallback = jasmine.createSpy('beforeUntrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: [0, 5],
          beforeUntrimRow: beforeUntrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.untrimRows([0, 5, 10, 15]);
        expect(beforeUntrimRowHookCallback).toHaveBeenCalledWith([0, 5], [0, 5], false, void 0, void 0, void 0);
        expect(plugin.isTrimmed(0)).toBeTruthy();
        expect(plugin.isTrimmed(5)).toBeTruthy();
      });
      it('should not perform untrimming and return `false` as the third parameter of the `beforeUntrimRow` hook' + ' if any of the provided rows is out of scope of the table', function () {
        var beforeUntrimRowHookCallback = jasmine.createSpy('beforeUntrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: [0, 5],
          beforeUntrimRow: beforeUntrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.untrimRows([0, 5, 10, 15]);
        expect(beforeUntrimRowHookCallback).toHaveBeenCalledWith([0, 5], [0, 5], false, void 0, void 0, void 0);
        expect(plugin.isTrimmed(0)).toBeTruthy();
        expect(plugin.isTrimmed(5)).toBeTruthy();
      });
    });
    describe('afterUntrimRow', function () {
      it('should fire the `afterUntrimRow` hook after untrimming a previously trimmed single row', function () {
        var afterUntrimRowHookCallback = jasmine.createSpy('afterUntrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: [2],
          afterUntrimRow: afterUntrimRowHookCallback
        });
        getPlugin('trimRows').untrimRow(2);
        expect(afterUntrimRowHookCallback).toHaveBeenCalledWith([2], [], true, true, void 0, void 0);
      });
      it('should fire the `afterUntrimRow` hook after untrimming a multiple, previously trimmed rows', function () {
        var afterUntrimRowHookCallback = jasmine.createSpy('afterUntrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: [2, 3, 4],
          afterUntrimRow: afterUntrimRowHookCallback
        });
        getPlugin('trimRows').untrimRows([2, 3, 4]);
        expect(afterUntrimRowHookCallback).toHaveBeenCalledWith([2, 3, 4], [], true, true, void 0, void 0);
      });
      it('it should NOT fire the `afterUntrimRow` hook, if the `beforeUntrimRow` hook returned false', function () {
        var afterUntrimRowHookCallback = jasmine.createSpy('afterUntrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          beforeUntrimRow: function beforeUntrimRow() {
            return false;
          },
          afterUntrimRow: afterUntrimRowHookCallback
        });
        getPlugin('trimRows').untrimRows([2, 3, 4]);
        expect(afterUntrimRowHookCallback).not.toHaveBeenCalled();
      });
      it('should return `false` as the fourth parameter, if the untrimming action did not change the state of the trimRows plugin', function () {
        var afterUntrimRowHookCallback = jasmine.createSpy('afterUntrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: true,
          afterUntrimRow: afterUntrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.untrimRows([0, 5]);
        expect(afterUntrimRowHookCallback).toHaveBeenCalledWith([], [], true, false, void 0, void 0);
      });
      it('should return `true` as the fourth parameter, if the untrimming action changed the state of the trimRows plugin', function () {
        var afterUntrimRowHookCallback = jasmine.createSpy('afterUntrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          trimRows: [0, 5],
          afterUntrimRow: afterUntrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.untrimRows([0, 5, 6]);
        expect(afterUntrimRowHookCallback).toHaveBeenCalledWith([0, 5], [], true, true, void 0, void 0);
      });
      it('should not perform hiding and return `false` as the third and fourth parameter of the `afterUntrimRow` hook' + ' if any of the provided rows is not integer', function () {
        var afterUntrimRowHookCallback = jasmine.createSpy('afterUntrimRowHookCallback');
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 7),
          trimRows: [0, 5],
          afterUntrimRow: afterUntrimRowHookCallback
        });
        var plugin = getPlugin('trimRows');
        plugin.untrimRows([0, 5, 1.1]);
        expect(afterUntrimRowHookCallback).toHaveBeenCalledWith([0, 5], [0, 5], false, false, void 0, void 0);
        expect(plugin.isTrimmed(0)).toBeTruthy();
        expect(plugin.isTrimmed(5)).toBeTruthy();
      });
    });
    it('should not override the `index` parameter of the `beforeCreateRow` hook', function () {
      var _expect;

      var onBeforeCreateRowCallback = jasmine.createSpy('beforeCreateRow');
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(3, 3),
        trimRows: true,
        beforeCreateRow: onBeforeCreateRowCallback
      });
      alter('insert_row', 1);

      (_expect = expect(onBeforeCreateRowCallback)).toHaveBeenCalledWith.apply(_expect, [1, 1].concat(_toConsumableArray(new Array(4))));
    });
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

    it('should skip trimmed rows, while copying data', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: [1, 5, 6, 7, 8],
        width: 500,
        height: 300
      });
      var copyEvent = getClipboardEventMock('copy');
      var plugin = hot.getPlugin('CopyPaste');
      selectCell(0, 0, 4, 9);
      plugin.setCopyableText();
      plugin.onCopy(copyEvent);
      /* eslint-disable no-tabs */

      expect(copyEvent.clipboardData.getData('text/plain')).toEqual('A1	B1	"C1\n' + 'line"	D1	E1	F1	G1	H1	I1	J1\n' + 'A3	B3	C3	D3	E3	F3	G3	H3	I3	J3\n' + 'A4	B4	C4	D4	E4	F4	G4	H4	I4	J4\n' + 'A5	B5	C5	D5	E5	F5	G5	H5	I5	J5\n' + 'A10	B10	C10	D10	E10	F10	G10	H10	I10	J10');
    });
  });
  describe('navigation', function () {
    it('should ignore trimmed rows while navigating by arrow keys', function () {
      handsontable({
        data: getMultilineData(50, 10),
        trimRows: [1, 5, 6, 7, 8],
        width: 500,
        height: 300
      });
      selectCell(0, 0, 0, 0);
      expect(getValue()).toEqual('A1');
      keyDownUp(Handsontable.helper.KEY_CODES.ARROW_DOWN);
      expect(getValue()).toEqual('A3');
      keyDownUp(Handsontable.helper.KEY_CODES.ARROW_DOWN);
      expect(getValue()).toEqual('A4');
      keyDownUp(Handsontable.helper.KEY_CODES.ARROW_DOWN);
      expect(getValue()).toEqual('A5');
      keyDownUp(Handsontable.helper.KEY_CODES.ARROW_DOWN);
      expect(getValue()).toEqual('A10');
    });
  });
  describe('column sorting', function () {
    it('should remove correct rows after sorting', function () {
      handsontable({
        data: getMultilineData(5, 10),
        columnSorting: {
          initialConfig: {
            column: 0,
            sortOrder: 'desc'
          }
        },
        trimRows: [1],
        width: 500,
        height: 300
      });
      alter('remove_row', 2, 1);
      expect(getDataAtCell(0, 0)).toBe('A5');
      expect(getDataAtCell(1, 0)).toBe('A4');
      expect(getDataAtCell(2, 0)).toBe('A1');
    });
    it('should remove correct rows after insert new rows in sorted column', function (done) {
      handsontable({
        data: getMultilineData(5, 10),
        colHeaders: true,
        columnSorting: {
          initialConfig: {
            column: 0,
            sortOrder: 'desc'
          }
        },
        trimRows: [1],
        width: 500,
        height: 300
      });
      setTimeout(function () {
        alter('insert_row', 2, 1);
        getHtCore().find('th span.columnSorting:eq(2)').simulate('mousedown');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('mouseup');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('click');
        alter('remove_row', 2, 1);
        expect(getDataAtCell(0, 0)).toBe('A1');
        expect(getDataAtCell(1, 0)).toBe('A3');
        expect(getDataAtCell(2, 0)).toBe('A5');
        expect(getDataAtCell(3, 0)).toBe(null);
        done();
      }, 100);
    });
    it('should remove correct rows after insert new rows in sorted column (multiple sort click)', function (done) {
      handsontable({
        data: getMultilineData(5, 10),
        colHeaders: true,
        columnSorting: {
          initialConfig: {
            column: 0,
            sortOrder: 'desc'
          }
        },
        trimRows: [1],
        width: 500,
        height: 300
      });
      setTimeout(function () {
        alter('insert_row', 2, 1);
        getHtCore().find('th span.columnSorting:eq(2)').simulate('mousedown');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('mouseup');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('click');
        alter('insert_row', 0, 1);
        getHtCore().find('th span.columnSorting:eq(2)').simulate('mousedown');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('mouseup');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('click');
        alter('remove_row', 0, 3);
        expect(getDataAtCell(0, 0)).toBe('A1');
        expect(getDataAtCell(1, 0)).toBe(null);
        expect(getDataAtCell(2, 0)).toBe(null);
        expect(getDataAtCell(3, 0)).toBe(null);
        done();
      }, 100);
    });
  });
  describe('maxRows option set', function () {
    it('should return properly data after trimming', function (done) {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        maxRows: 3,
        trimRows: [2, 3]
      });
      setTimeout(function () {
        expect(getData().length).toEqual(3);
        expect(getDataAtCell(2, 1)).toEqual('B5');
        done();
      }, 100);
    });
  });
  describe('minRows option set', function () {
    it('should not fill the table with empty rows (to the `minRows` limit), when editing rows in a table with trimmed rows', function (done) {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        minRows: 10,
        trimRows: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      });
      expect(hot.countRows()).toEqual(1);
      hot.setDataAtCell(0, 0, 'test');
      setTimeout(function () {
        expect(hot.countRows()).toEqual(1);
        done();
      }, 100);
    });
  });
  describe('minSpareRows option set', function () {
    it('should not fill the table with empty rows (to the `minSpareRows` limit), when editing rows in a table with trimmed rows', function (done) {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        minSpareRows: 4,
        trimRows: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      });
      expect(hot.countRows()).toEqual(1);
      hot.setDataAtCell(0, 0, 'test');
      setTimeout(function () {
        expect(hot.countRows()).toEqual(1);
        done();
      }, 100);
    });
  });
  describe('updateSettings', function () {
    it('should update list of trimmed rows when array of indexes is passed to the method - test no. 1', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: [2, 6, 7],
        width: 500,
        height: 300
      });
      hot.updateSettings({
        trimRows: [1, 2, 3, 4, 5]
      });
      expect(getDataAtCell(0, 0)).toBe('A1');
      expect(getDataAtCell(1, 0)).toBe('A7');
      expect(getDataAtCell(2, 0)).toBe('A8');
      expect(getDataAtCell(3, 0)).toBe('A9');
      expect(getDataAtCell(4, 0)).toBe('A10');
    });
    it('should update list of trimmed rows when array of indexes is passed to the method - test no. 2', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: true,
        width: 500,
        height: 300
      });
      hot.getPlugin('trimRows').trimRows([2, 6, 7]);
      hot.render();
      hot.updateSettings({
        trimRows: [1, 2, 3, 4, 5]
      });
      expect(getDataAtCell(0, 0)).toBe('A1');
      expect(getDataAtCell(1, 0)).toBe('A7');
      expect(getDataAtCell(2, 0)).toBe('A8');
      expect(getDataAtCell(3, 0)).toBe('A9');
      expect(getDataAtCell(4, 0)).toBe('A10');
    });
    it('should clear list of trimmed rows when empty array is passed to the method - test no. 1', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: [2, 6, 7],
        width: 500,
        height: 300
      });
      hot.updateSettings({
        trimRows: []
      });
      expect(this.$container.find('td').length).toEqual(100);
    });
    it('should clear list of trimmed rows when empty array is passed to the method - test no. 2', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: true,
        width: 500,
        height: 300
      });
      hot.getPlugin('trimRows').trimRows([2, 6, 7]);
      hot.render();
      hot.updateSettings({
        trimRows: []
      });
      expect(this.$container.find('td').length).toEqual(100);
    });
    it('should clear list of trimmed rows when handled setting object has key `trimRows` with value ' + 'set to `false` - test no. 1', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: [2, 6, 7],
        width: 500,
        height: 300
      });
      hot.updateSettings({
        trimRows: false
      });
      expect(this.$container.find('td').length).toEqual(100);
    });
    it('should clear list of trimmed rows when handled setting object has key `trimRows` with value ' + 'set to `false` - test no. 2', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: true,
        width: 500,
        height: 300
      });
      hot.getPlugin('trimRows').trimRows([2, 6, 7]);
      hot.render();
      hot.updateSettings({
        trimRows: false
      });
      expect(this.$container.find('td').length).toEqual(100);
    });
    it('shouldn\'t clear list of trimmed rows when handled setting object has key `trimRows` with value ' + 'set to `true` - test no. 1', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: [2, 6, 7],
        width: 500,
        height: 300
      });
      hot.updateSettings({
        trimRows: true
      });
      expect(getData().length).toEqual(7);
    });
    it('shouldn\'t clear list of trimmed rows when handled setting object has key `trimRows` with value ' + 'set to `true` - test no. 2', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: true,
        width: 500,
        height: 300
      });
      hot.getPlugin('trimRows').trimRows([2, 6, 7]);
      hot.render();
      hot.updateSettings({
        trimRows: true
      });
      expect(getData().length).toEqual(7);
    });
    it('shouldn\'t change list of trimmed rows when handled setting object don\'t have `trimRows` key - test no. 1', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: [2, 6, 7],
        width: 500,
        height: 300
      });
      hot.updateSettings({});
      hot.render();
      expect(getData().length).toEqual(7);
    });
    it('shouldn\'t change list of trimmed rows when handled setting object don\'t have `trimRows` key - test no. 2', function () {
      var hot = handsontable({
        data: getMultilineData(10, 10),
        trimRows: true,
        width: 500,
        height: 300
      });
      hot.getPlugin('trimRows').trimRows([2, 6, 7]);
      hot.render();
      hot.updateSettings({});
      expect(getData().length).toEqual(7);
    });
  });
});