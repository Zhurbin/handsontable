"use strict";

describe('ContextMenuReadOnly', function () {
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
  it('should render noItems item only if contextmenu has no available options', function () {
    handsontable({
      rowHeaders: true,
      colHeaders: true,
      contextMenu: []
    });
    contextMenu();
    var item = $('.htItemWrapper').filter(function () {
      return $(this).text() === 'No available options';
    });
    expect(item.length).toBe(1);
  });
  it('should not render noItems item if contextmenu has available options', function () {
    handsontable({
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true
    });
    contextMenu();
    var item = $('.htItemWrapper').filter(function () {
      return $(this).text() === 'No available options';
    });
    expect(item.length).toBe(0);
  });
  it('should be possible to overwrite noItems\' name', function () {
    handsontable({
      rowHeaders: true,
      colHeaders: true,
      contextMenu: {
        items: {
          no_items: {
            name: 'No options'
          }
        }
      }
    });
    contextMenu();
    var item = $('.htDisabled .htItemWrapper').filter(function () {
      return $(this).text() === 'No options';
    });
    expect(item.length).toBe(1);
  });
  it('should be possible to no render context menu completely', function () {
    handsontable({
      rowHeaders: true,
      colHeaders: true,
      contextMenu: {
        items: {
          no_items: {
            hidden: function hidden() {
              return true;
            }
          }
        }
      }
    });
    contextMenu();
    var items = $('.htItemWrapper');
    expect(getPlugin('contextMenu').menu.isOpened()).toBe(false);
    expect(items.length).toBe(0);
  });
});