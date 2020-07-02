"use strict";

var _columnStatesManager = require("handsontable/plugins/columnSorting/columnStatesManager");

var _utils = require("handsontable/plugins/columnSorting/utils");

var _domHelpers = require("handsontable/plugins/multiColumnSorting/domHelpers");

describe('MultiColumnSorting DOM helpers', function () {
  describe('getClassesToAdd', function () {
    it('multiple sorted columns', function () {
      var columnStatesManager = new _columnStatesManager.ColumnStatesManager();
      columnStatesManager.setSortStates([{
        column: 1,
        sortOrder: _utils.DESC_SORT_STATE
      }, {
        column: 0,
        sortOrder: _utils.ASC_SORT_STATE
      }]);
      expect((0, _domHelpers.getClassesToAdd)(columnStatesManager, 0, false).includes('sort-2')).toBeFalsy();
      expect((0, _domHelpers.getClassesToAdd)(columnStatesManager, 0, true).includes('sort-2')).toBeTruthy();
      expect((0, _domHelpers.getClassesToAdd)(columnStatesManager, 1, false).includes('sort-1')).toBeFalsy();
      expect((0, _domHelpers.getClassesToAdd)(columnStatesManager, 1, true).includes('sort-1')).toBeTruthy();
    });
  });
  describe('getClassedToRemove', function () {
    it('should return all calculated classes', function () {
      var columnStatesManager = new _columnStatesManager.ColumnStatesManager();
      columnStatesManager.setSortStates([{
        column: 1,
        sortOrder: _utils.DESC_SORT_STATE
      }, {
        column: 0,
        sortOrder: _utils.ASC_SORT_STATE
      }, {
        column: 2,
        sortOrder: _utils.ASC_SORT_STATE
      }, {
        column: 3,
        sortOrder: _utils.ASC_SORT_STATE
      }]);
      var htmlElementMock = {
        className: 'columnSorting sort-1 sort-2 sort-3 sort-4 sortAction'
      };
      expect((0, _domHelpers.getClassedToRemove)(htmlElementMock).length).toEqual(4);
      expect((0, _domHelpers.getClassedToRemove)(htmlElementMock).includes('sort-1')).toBeTruthy();
      expect((0, _domHelpers.getClassedToRemove)(htmlElementMock).includes('sort-2')).toBeTruthy();
      expect((0, _domHelpers.getClassedToRemove)(htmlElementMock).includes('sort-3')).toBeTruthy();
      expect((0, _domHelpers.getClassedToRemove)(htmlElementMock).includes('sort-4')).toBeTruthy();
    });
  });
});