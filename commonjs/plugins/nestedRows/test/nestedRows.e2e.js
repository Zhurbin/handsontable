"use strict";

describe('NestedRows', function () {
  var id = 'testContainer';
  beforeEach(function () {
    this.$container = $("<div id=\"".concat(id, "\"></div>")).appendTo('body');
  });
  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });
  describe('Displaying a nested structure', function () {
    it('should display as many rows as there are overall elements in a nested structure', function () {
      var hot = handsontable({
        data: getDataForNestedRows(),
        nestedRows: true
      });
      expect(hot.countRows()).toEqual(12);
    });
    it('should display all nested structure elements in correct order (parent, its children, its children children, next parent etc)', function () {
      var hot = handsontable({
        data: getDataForNestedRows(),
        nestedRows: true
      });
      var dataInOrder = [['a0', 'b0'], ['a0-a0', 'b0-b0'], ['a0-a1', 'b0-b1'], ['a0-a1-a0', 'b0-b1-b0'], ['a0-a1-a0-a0', 'b0-b1-b0-b0'], ['a0-a2', 'b0-b2'], ['a1', 'b1'], ['a2', 'b2'], ['a2-a0', 'b2-b0'], ['a2-a1', 'b2-b1'], ['a2-a1-a0', 'b2-b1-b0'], ['a2-a1-a1', 'b2-b1-b1']];
      expect(hot.getData()).toEqual(dataInOrder);
    });
    it('should display the right amount of entries with the `manualRowMove` plugin enabled', function () {
      var hot = handsontable({
        data: getDataForNestedRows(),
        nestedRows: true,
        manualRowMove: true
      });
      expect(hot.getData().length).toEqual(12);
    });
    it('should display the right amount of entries when calling loadData after being initialized with empty data', function (done) {
      var hot = handsontable({
        data: [],
        nestedRows: true
      });
      setTimeout(function () {
        hot.loadData(getDataForNestedRows());
        expect(hot.countRows()).toEqual(12);
        done();
      }, 100);
    });
    it('should display the right amount of entries when calling loadData with another set of data', function (done) {
      var hot = handsontable({
        data: getDataForNestedRows(),
        nestedRows: true
      });
      setTimeout(function () {
        hot.loadData(getDataForNestedRows().slice(0, 1));
        expect(hot.countRows()).toEqual(6);
        done();
      }, 100);
    });
  });
});