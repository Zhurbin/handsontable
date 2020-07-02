"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('Filters UI', function () {
  var id = 'testContainer';
  beforeAll(function () {
    // Note: please keep in mind that this language will be registered for all e2e tests!
    // It's stored globally for already loaded Handsontable library.
    Handsontable.languages.registerLanguageDictionary({
      languageCode: 'longerForTests',
      'Filters:conditions.isEmpty': 'This is very long text for conditional menu item'
    });
  });
  beforeEach(function () {
    this.$container = $("<div id=\"".concat(id, "\"></div>")).appendTo('body');
  });
  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });
  describe('Conditional component', function () {
    it('should display conditional filter component under dropdown menu',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuCondition .htFiltersMenuLabel').textContent).toBe('Filter by condition:');
      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuCondition .htUISelect')).not.toBeNull();
      expect(dropdownMenuRootElement().querySelectorAll('.htFiltersMenuCondition .htUIInput').length).toBe(4);
      yield sleep(300); // The filter components should be intact after some time. These expectations check whether the GhostTable
      // does not steal the components' element while recalculating column width (PR #5555).

      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuCondition .htFiltersMenuLabel').textContent).toBe('Filter by condition:');
      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuCondition .htUISelect')).not.toBeNull();
      expect(dropdownMenuRootElement().querySelectorAll('.htFiltersMenuCondition .htUIInput').length).toBe(4);
    }));
    it('should appear conditional options menu after UISelect element click', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      expect(document.querySelector('.htFiltersConditionsMenu.handsontable table')).toBeNull();
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      expect(document.querySelector('.htFiltersConditionsMenu.handsontable table')).not.toBeNull();
    });
    it('should appear conditional options menu in the proper place after UISelect element click', function () {
      var hot = handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      hot.rootElement.style.marginTop = '1000px';
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      var rect = document.querySelector('.htFiltersConditionsMenu.handsontable table').getBoundingClientRect();
      expect(rect.top).toBeGreaterThan(500);
      hot.rootElement.style.marginTop = '';
    });
    it('should appear specified conditional options menu for text cell types', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      var menuItems = $(conditionMenuRootElements().first).find('.htCore tr').map(function () {
        return this.textContent;
      }).toArray();
      expect(menuItems).toEqual(['None', '', 'Is empty', 'Is not empty', '', 'Is equal to', 'Is not equal to', '', 'Begins with', 'Ends with', '', 'Contains', 'Does not contain']);
    });
    it('should appear specified conditional options menu for numeric cell types', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(5);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      var menuItems = $(conditionMenuRootElements().first).find('.htCore tr').map(function () {
        return this.textContent;
      }).toArray();
      expect(menuItems).toEqual(['None', '', 'Is empty', 'Is not empty', '', 'Is equal to', 'Is not equal to', '', 'Greater than', 'Greater than or equal to', 'Less than', 'Less than or equal to', 'Is between', 'Is not between']);
    });
    it('should appear specified conditional options menu for date cell types', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(3);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      var menuItems = $(conditionMenuRootElements().first).find('.htCore tr').map(function () {
        return this.textContent;
      }).toArray();
      expect(menuItems).toEqual(['None', '', 'Is empty', 'Is not empty', '', 'Is equal to', 'Is not equal to', '', 'Before', 'After', 'Is between', '', 'Tomorrow', 'Today', 'Yesterday']);
    });
    it('should appear general conditional options menu for mixed cell types', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300,
        cells: function cells(row, col) {
          if (col === 3 && row === 2) {
            this.type = 'text';
          }
        }
      });
      dropdownMenu(3);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      var menuItems = $(conditionMenuRootElements().first).find('.htCore tr').map(function () {
        return this.textContent;
      }).toArray();
      expect(menuItems).toEqual(['None', '', 'Is empty', 'Is not empty', '', 'Is equal to', 'Is not equal to', '', 'Begins with', 'Ends with', '', 'Contains', 'Does not contain']);
    });
    it('should not select dropdown menu item while pressing arrow up key when filter\'s input component is focused (#6506)',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(2);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('mousedown').simulate('mouseup').simulate('click'); // "Is equal to"

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(6) td')).simulate('mousedown').simulate('mouseup').simulate('click');
      yield sleep(100); // Wait for autofocus of the filter input element

      document.activeElement.value = '123';
      keyDownUp('arrow_up');
      keyDownUp('arrow_up');
      keyDownUp('arrow_up'); // The menu item is frozen on the lastly selected item

      expect(getPlugin('dropdownMenu').menu.getSelectedItem().key).toBe('filter_by_condition');
    }));
    it('should appear specified conditional options menu depends on cell types when table has all filtered rows', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(3);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // is empty

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(3) td')).simulate('mousedown');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK')).simulate('click');
      dropdownMenu(3);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      var menuItems = $(conditionMenuRootElements().first).find('.htCore tr').map(function () {
        return this.textContent;
      }).toArray();
      expect(menuItems).toEqual(['None', '', 'Is empty', 'Is not empty', '', 'Is equal to', 'Is not equal to', '', 'Before', 'After', 'Is between', '', 'Tomorrow', 'Today', 'Yesterday']);
    });
    it('should disappear conditional options menu after outside the table click', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      expect(document.querySelector('.htFiltersConditionsMenu.handsontable table')).not.toBeNull();
      $(document.body).simulate('mousedown');
      expect($(dropdownMenuRootElement()).is(':visible')).toBe(false);
    });
    it('should disappear conditional options menu after click inside main menu', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      expect(document.querySelector('.htFiltersConditionsMenu.handsontable table')).not.toBeNull();
      $(document.querySelector('.htDropdownMenu.handsontable table tr td')).simulate('mousedown');
      expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
      expect($(dropdownMenuRootElement()).is(':visible')).toBe(true);
    });
    it('should disappear conditional options menu after dropdown action click', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      expect(document.querySelector('.htFiltersConditionsMenu.handsontable table')).not.toBeNull();
      $(dropdownMenuRootElement().querySelector('tbody :nth-child(6) td')).simulate('mousedown').simulate('mouseup');
      expect($(dropdownMenuRootElement()).is(':visible')).toBe(false);
    });
    it('should disappear dropdown menu after hitting ESC key in conditional component ' + 'which show other input and focus the element', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Is equal to")').simulate('mousedown').simulate('mouseup');
      setTimeout(function () {
        keyDownUp('esc');
        expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
        expect($(dropdownMenuRootElement()).is(':visible')).toBe(false);
        done();
      }, 200);
    });
    it('should disappear dropdown menu after hitting ESC key in conditional component ' + 'which don\'t show other input and focus is loosen #86',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      var button = hot().view.wt.wtTable.getColumnHeader(1).querySelector('.changeType');
      $(button).simulate('mousedown'); // This sleep emulates more realistic user behavior. The `mouseup` event in all cases is not
      // triggered directly after the `mousedown` event. First of all, a user is not able to
      // click so fast. Secondly, there can be a device lag between `mousedown` and `mouseup`
      // events. This fixes an issue related to failing test, which works on browser under
      // user control but fails while automatic tests.

      yield sleep(0);
      $(button).simulate('mouseup');
      $(button).simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('mousedown').simulate('mouseup').simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Is empty")').simulate('mousedown').simulate('mouseup').simulate('click');
      yield sleep(200);
      keyDownUp('esc');
      expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
      expect($(dropdownMenuRootElement()).is(':visible')).toBe(false);
    }));
    it('should disappear dropdown menu after hitting ESC key, next to closing SelectUI #149',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      var button = hot().view.wt.wtTable.getColumnHeader(1).querySelector('.changeType');
      $(button).simulate('mousedown'); // This sleep emulates more realistic user behavior. The `mouseup` event in all cases is not
      // triggered directly after the `mousedown` event. First of all, a user is not able to
      // click so fast. Secondly, there can be a device lag between `mousedown` and `mouseup`
      // events. This fixes an issue related to failing test, which works on browser under
      // user control but fails while automatic tests.

      yield sleep(0);
      $(button).simulate('mouseup');
      $(button).simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('mousedown').simulate('mouseup').simulate('click');
      yield sleep(200);
      keyDownUp('esc');
      keyDownUp('esc');
      expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
      expect($(dropdownMenuRootElement()).is(':visible')).toBe(false);
    }));
    it('should focus dropdown menu after closing select component', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // is empty (test for condition which doesn't have input elements to provide filtered values)

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(3) td')).simulate('mousedown').simulate('mouseup');
      expect(getPlugin('dropdownMenu').menu.hotMenu.isListening()).toBe(true); // is equal to (test for condition which has input elements to provide filtered values, that focusable elements
      // can cause the menu focus)

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(6) td')).simulate('mousedown').simulate('mouseup');
      expect(getPlugin('dropdownMenu').menu.hotMenu.isListening()).toBe(true);
    });
    it('should not blur filter component\'s input element when it is clicked',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('mousedown').simulate('mouseup').simulate('click'); // "Is equal to"

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(6) td')).simulate('mousedown').simulate('mouseup').simulate('click'); // The input element is focused asynchronously from the filter plugin code.

      yield sleep(50);
      var inputElement = dropdownMenuRootElement().querySelector('.htUIInput input');
      $(inputElement).simulate('mousedown').simulate('mouseup').simulate('click');
      expect(document.activeElement).toBe(inputElement);
    }));
    it('shouldn\'t disappear dropdown menu after conditional options menu click', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(3) td')).simulate('mousedown').simulate('mouseup');
      expect($(dropdownMenuRootElement()).is(':visible')).toBe(true);
      expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
    });
    describe('should display extra conditional component inside filters dropdownMenu properly #160', function () {
      it('should not display extra condition element at start', function () {
        handsontable({
          data: getDataForFilters(),
          columns: getColumnsForFilters(),
          filters: true,
          dropdownMenu: true,
          width: 500,
          height: 300
        });
        dropdownMenu(1);
        expect($(conditionSelectRootElements().second).is(':visible')).toBe(false);
      });
      it('should show extra condition element after specific conditional options menu click', function () {
        handsontable({
          data: getDataForFilters(),
          columns: getColumnsForFilters(),
          filters: true,
          dropdownMenu: true,
          width: 500,
          height: 300
        });
        dropdownMenu(1);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
        $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
        expect($(dropdownMenuRootElement()).is(':visible')).toBe(true);
        expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
        expect($(conditionSelectRootElements().second).is(':visible')).toBe(true);
      });
      it('should not show extra condition element after specific conditional options menu click', function () {
        handsontable({
          data: getDataForFilters(),
          columns: getColumnsForFilters(),
          filters: true,
          dropdownMenu: true,
          width: 500,
          height: 300
        });
        dropdownMenu(1);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
        $(conditionMenuRootElements().first).find('tbody td:contains("None")').simulate('mousedown').simulate('mouseup');
        expect($(dropdownMenuRootElement()).is(':visible')).toBe(true);
        expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
        expect($(conditionSelectRootElements().second).is(':visible')).toBe(false);
      });
      it('should hide extra condition element after specific conditional options menu click', function () {
        handsontable({
          data: getDataForFilters(),
          columns: getColumnsForFilters(),
          filters: true,
          dropdownMenu: true,
          width: 500,
          height: 300
        });
        dropdownMenu(1);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
        $(conditionMenuRootElements().first).find('tbody td:contains("Is equal to")').simulate('mousedown').simulate('mouseup');
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
        $(conditionMenuRootElements().first).find('tbody td:contains("None")').simulate('mousedown').simulate('mouseup');
        expect($(dropdownMenuRootElement()).is(':visible')).toBe(true);
        expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
        expect($(conditionSelectRootElements().second).is(':visible')).toBe(false);
      });
      it('should not show extra condition elements after changing value of cell when conditions wasn\'t set' + '(`conditionUpdateObserver` triggers hook)', function () {
        handsontable({
          data: getDataForFilters(),
          columns: getColumnsForFilters(),
          filters: true,
          dropdownMenu: true,
          width: 500,
          height: 300
        });
        selectCell(3, 0);
        keyDownUp('enter');
        document.activeElement.value = '99';
        keyDownUp('enter');
        dropdownMenu(1);
        expect($(conditionSelectRootElements().second).is(':visible')).toBe(false);
        expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(false);
      });
      it('should show proper condition elements after changing value of cell when condition was set' + '(`conditionUpdateObserver` triggers hook)', function () {
        var hot = handsontable({
          data: getDataForFilters(),
          columns: getColumnsForFilters(),
          filters: true,
          dropdownMenu: true,
          width: 500,
          height: 300
        });
        var filters = hot.getPlugin('filters');
        filters.addCondition(1, 'gte', [10]);
        filters.filter();
        selectCell(3, 0);
        keyDownUp('enter');
        document.activeElement.value = '99';
        keyDownUp('enter');
        dropdownMenu(1);
        expect($(conditionSelectRootElements().first).is(':visible')).toBe(true);
        expect($(conditionSelectRootElements().second).is(':visible')).toBe(true);
        expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(true);
      });
    });
    it('should not select separator from conditional menu', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // menu separator click

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(2) td')).simulate('mousedown').simulate('mouseup');
      expect($(conditionSelectRootElements().first).find('.htUISelectCaption').text()).toBe('None');
    });
    it('should save state of applied filter for specified column',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // eq

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(6) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Is equal to '5'

      document.activeElement.value = '5';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      dropdownMenu(0);
      expect(dropdownMenuRootElement().querySelector('.htUISelectCaption').textContent).toBe('Is equal to');
      var inputs = dropdownMenuRootElement().querySelectorAll('.htFiltersMenuCondition .htUIInput input');
      expect($(inputs[0]).is(':visible')).toBe(true);
      expect(inputs[0].value).toBe('5');
      expect($(inputs[1]).is(':visible')).toBe(false);
      dropdownMenu(3);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // between

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(11) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Is equal to '5'

      document.activeElement.value = '5';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      dropdownMenu(3);
      expect(dropdownMenuRootElement().querySelector('.htUISelectCaption').textContent).toBe('Is between');
      inputs = dropdownMenuRootElement().querySelectorAll('.htFiltersMenuCondition .htUIInput input');
      expect($(inputs[0]).is(':visible')).toBe(true);
      expect(inputs[0].value).toBe('5');
      expect($(inputs[1]).is(':visible')).toBe(true);
      expect(inputs[1].value).toBe('');
    }));
    it('should save state of applied filter for specified column when conditions was added from API', function (done) {
      var hot = handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var filters = hot.getPlugin('filters');
      filters.addCondition(1, 'gte', [10]);
      filters.filter();
      dropdownMenu(1);
      setTimeout(function () {
        expect(dropdownMenuRootElement().querySelector('.htUISelectCaption').textContent).toBe('Greater than or equal to');
        var inputs = dropdownMenuRootElement().querySelectorAll('.htFiltersMenuCondition .htUIInput input');
        expect($(inputs[0]).is(':visible')).toBe(true);
        expect(inputs[0].value).toBe('10');
        expect($(inputs[1]).is(':visible')).toBe(false);
        filters.clearConditions(1);
        filters.filter();
        dropdownMenu(1);
      }, 200);
      setTimeout(function () {
        expect(dropdownMenuRootElement().querySelector('.htUISelectCaption').textContent).toBe('None');
        var inputs = dropdownMenuRootElement().querySelectorAll('.htFiltersMenuCondition .htUIInput input');
        expect($(inputs[0]).is(':visible')).toBe(false);
        expect($(inputs[1]).is(':visible')).toBe(false);
        done();
      }, 400);
    });
    it('should work properly when user added condition with too many arguments #179',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      var spy = spyOn(window, 'onerror');
      var hot = handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var plugin = hot.getPlugin('filters');
      var th = hot.view.wt.wtTable.getColumnHeader(1);
      var filterButton = $(th).find('button');
      plugin.addCondition(1, 'begins_with', ['a', 'b', 'c', 'd']);
      $(filterButton).simulate('click');
      expect(spy).not.toHaveBeenCalled();
    }));
  });
  describe('"by value" component', function () {
    it('should appear under dropdown menu',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuValue .htFiltersMenuLabel').textContent).toBe('Filter by value:');
      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuValue .htUIMultipleSelect')).not.toBeNull();
      yield sleep(300); // The filter components should be intact after some time. These expectations check whether the GhostTable
      // does not steal the components' element while recalculating column width (PR #5555).

      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuValue .htFiltersMenuLabel').textContent).toBe('Filter by value:');
      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuValue .htUIMultipleSelect')).not.toBeNull();
    }));
    it('should not scroll the view after selecting the item (test for checking if the event bubbling is not blocked, #6497)',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters().slice(0, 15),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(2);
      yield sleep(200);
      $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('mousedown').simulate('mouseup').simulate('click');
      expect($(byValueBoxRootElement()).find('.ht_master .wtHolder').scrollTop()).toBe(0);
      $(byValueBoxRootElement()).find('tr:nth-child(5) :checkbox').simulate('mouseover');
      $(byValueBoxRootElement()).find('tr:nth-child(6) :checkbox').simulate('mouseover');
      $(byValueBoxRootElement()).find('tr:nth-child(7) :checkbox').simulate('mouseover');
      yield sleep(200);
      expect($(byValueBoxRootElement()).find('.ht_master .wtHolder').scrollTop()).toBe(0);
    }));
    it('should display empty values as "(Blank cells)"', function () {
      var data = getDataForFilters();
      data[3].name = '';
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      expect(byValueMultipleSelect().element.querySelector('.htCore td').textContent).toBe('Alice Blake');
      loadData(data);
      dropdownMenu(1);
      expect(byValueMultipleSelect().element.querySelector('.htCore td').textContent).toBe('(Blank cells)');
    });
    it('should display `null` values as "(Blank cells)"', function () {
      var data = getDataForFilters();
      data[3].name = null;
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      expect(byValueMultipleSelect().element.querySelector('.htCore td').textContent).toBe('Alice Blake');
      loadData(data);
      dropdownMenu(1);
      expect(byValueMultipleSelect().element.querySelector('.htCore td').textContent).toBe('(Blank cells)');
    });
    it('should display `undefined` values as "(Blank cells)"', function () {
      var data = getDataForFilters();
      data[3].name = void 0;
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      expect(byValueMultipleSelect().element.querySelector('.htCore td').textContent).toBe('Alice Blake');
      loadData(data);
      dropdownMenu(1);
      expect(byValueMultipleSelect().element.querySelector('.htCore td').textContent).toBe('(Blank cells)');
    });
    it('shouldn\'t break "by value" items in the next filter stacks', function (done) {
      var data = getDataForFilters();
      data[3].name = void 0;
      handsontable({
        data: data,
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      setTimeout(function () {
        // deselect "(Blank cells)"
        $(byValueMultipleSelect().element.querySelector('.htUIMultipleSelectHot td input')).simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(2);
      }, 200);
      setTimeout(function () {
        // deselect "Alamo"
        $(byValueMultipleSelect().element.querySelector('.htUIMultipleSelectHot td input')).simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(1);
      }, 400);
      setTimeout(function () {
        // select "(Blank cells)"
        $(byValueMultipleSelect().element.querySelector('.htUIMultipleSelectHot td input')).simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(2);
      }, 600);
      setTimeout(function () {
        expect(byValueMultipleSelect().element.querySelector('.htCore td').textContent).toBe('Alamo');
        done();
      }, 800);
    });
    it('should disappear after hitting ESC key (focused search input)', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      byValueMultipleSelect().element.querySelector('input').focus();
      setTimeout(function () {
        keyDownUp('esc');
        expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
        expect($(dropdownMenuRootElement()).is(':visible')).toBe(false);
        done();
      }, 200);
    });
    it('should disappear after hitting ESC key (focused items box)', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      setTimeout(function () {
        byValueMultipleSelect().itemsBox.listen();
        keyDownUp('esc');
        expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
        expect($(dropdownMenuRootElement()).is(':visible')).toBe(false);
        done();
      }, 100);
    });
    describe('Updating "by value" component cache #87', function () {
      it('should update component view after applying filtering and changing cell value', function () {
        handsontable({
          data: [{
            id: 1,
            name: 'Nannie Patel',
            address: 'AAA City'
          }, {
            id: 2,
            name: 'Leanne Ware',
            address: 'BBB City'
          }, {
            id: 3,
            name: 'Mathis Boone',
            address: 'CCC City'
          }],
          columns: [{
            data: 'id',
            type: 'numeric',
            title: 'ID'
          }, {
            data: 'name',
            type: 'text',
            title: 'Full name'
          }, {
            data: 'address',
            type: 'text',
            title: 'Address'
          }],
          dropdownMenu: true,
          filters: true,
          width: 500,
          height: 300
        });
        dropdownMenu(2);
        $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        setDataAtCell(0, 2, 'BBB City - modified');
        dropdownMenu(2);
        expect($(byValueBoxRootElement()).find('tr:contains("BBB City - modified")').length).toEqual(1);
        var checkboxes = $(byValueBoxRootElement()).find(':checkbox').toArray();
        var checkedArray = checkboxes.map(function (element) {
          return element.checked;
        });
        expect(checkedArray).toEqual([false, true, true]);
      });
      it('should not modify checkboxes if the user changed values in another column', function () {
        var hot = handsontable({
          data: Handsontable.helper.createSpreadsheetData(5, 2),
          dropdownMenu: true,
          colHeaders: true,
          filters: true
        });
        var filters = hot.getPlugin('Filters');
        filters.addCondition(0, 'by_value', [['A2', 'A3', 'A4', 'A5']]);
        filters.filter();
        hot.selectCell(0, 1);
        hot.emptySelectedCells();
        dropdownMenu(0);
        var checkboxes = $(byValueBoxRootElement()).find(':checkbox');
        expect(checkboxes[0].checked).toBe(false);
        expect(checkboxes[1].checked).toBe(true);
        expect(checkboxes[2].checked).toBe(true);
        expect(checkboxes[3].checked).toBe(true);
        expect(checkboxes[4].checked).toBe(true);
      });
      it('should show proper number of values after refreshing cache ' + '(should remove the value from component), case nr 1 (changing value to match unfiltered value)', function () {
        handsontable({
          data: [{
            id: 1,
            name: 'Nannie Patel',
            address: 'AAA City'
          }, {
            id: 2,
            name: 'Leanne Ware',
            address: 'BBB City'
          }, {
            id: 3,
            name: 'Mathis Boone',
            address: 'CCC City'
          }, {
            id: 4,
            name: 'Heather Mcdaniel',
            address: 'DDD City'
          }],
          columns: getColumnsForFilters(),
          dropdownMenu: true,
          filters: true,
          width: 500,
          height: 300
        });
        dropdownMenu(2);
        $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        setDataAtCell(0, 2, 'CCC City'); // BBB City -> CCC City

        dropdownMenu(2);
        var elements = $(byValueBoxRootElement()).find('label').toArray();
        var text = elements.map(function (element) {
          return $(element).text();
        });
        expect(text).toEqual(['AAA City', 'CCC City', 'DDD City']);
        var checkboxes = $(byValueBoxRootElement()).find(':checkbox').toArray();
        var checkedArray = checkboxes.map(function (element) {
          return element.checked;
        });
        expect(checkedArray).toEqual([false, true, true]);
      });
      it('should show proper number of values after refreshing cache ' + '(should remove the value from component), case nr 2 (changing value to match filtered value)', function (done) {
        handsontable({
          data: [{
            id: 1,
            name: 'Nannie Patel',
            address: 'AAA City'
          }, {
            id: 2,
            name: 'Leanne Ware',
            address: 'AAAA City'
          }, {
            id: 3,
            name: 'Mathis Boone',
            address: 'CCC City'
          }, {
            id: 4,
            name: 'Heather Mcdaniel',
            address: 'DDD City'
          }],
          columns: [{
            data: 'id',
            type: 'numeric',
            title: 'ID'
          }, {
            data: 'name',
            type: 'text',
            title: 'Full name'
          }, {
            data: 'address',
            type: 'text',
            title: 'Address'
          }],
          dropdownMenu: true,
          filters: true,
          width: 500,
          height: 300
        });
        dropdownMenu(2);
        $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        setDataAtCell(0, 2, 'AAA City'); // AAAA City -> AAA City

        dropdownMenu(2);
        var elements = $(byValueBoxRootElement()).find('label').toArray();
        var text = elements.map(function (element) {
          return $(element).text();
        });
        expect(text).toEqual(['AAA City', 'CCC City', 'DDD City']);
        done();
      });
      it('should show proper number of values after refreshing cache (should add new value to component)', function () {
        handsontable({
          data: [{
            id: 1,
            name: 'Nannie Patel',
            address: 'AAA City'
          }, {
            id: 2,
            name: 'Leanne Ware',
            address: 'BBB City'
          }, {
            id: 3,
            name: 'Mathis Boone',
            address: 'BBB City'
          }, {
            id: 4,
            name: 'Heather Mcdaniel',
            address: 'DDD City'
          }],
          columns: [{
            data: 'id',
            type: 'numeric',
            title: 'ID'
          }, {
            data: 'name',
            type: 'text',
            title: 'Full name'
          }, {
            data: 'address',
            type: 'text',
            title: 'Address'
          }],
          dropdownMenu: true,
          filters: true,
          width: 500,
          height: 300
        });
        dropdownMenu(2);
        $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        setDataAtCell(1, 2, 'CCC City');
        dropdownMenu(2);
        var elements = $(byValueBoxRootElement()).find('label').toArray();
        var text = elements.map(function (element) {
          return $(element).text();
        });
        expect(text).toEqual(['AAA City', 'BBB City', 'CCC City', 'DDD City']);
        var checkboxes = $(byValueBoxRootElement()).find(':checkbox').toArray();
        var checkedArray = checkboxes.map(function (element) {
          return element.checked;
        });
        expect(checkedArray).toEqual([false, true, true, true]);
      });
      it('should sort updated values', function () {
        handsontable({
          data: [{
            id: 1,
            name: 'Nannie Patel',
            address: 'BBB City'
          }, {
            id: 2,
            name: 'Leanne Ware',
            address: 'ZZZ City'
          }, {
            id: 3,
            name: 'Mathis Boone',
            address: 'CCC City'
          }, {
            id: 4,
            name: 'Heather Mcdaniel',
            address: 'DDD City'
          }],
          columns: [{
            data: 'id',
            type: 'numeric',
            title: 'ID'
          }, {
            data: 'name',
            type: 'text',
            title: 'Full name'
          }, {
            data: 'address',
            type: 'text',
            title: 'Address'
          }],
          dropdownMenu: true,
          filters: true,
          width: 500,
          height: 300
        });
        dropdownMenu(2);
        $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        setDataAtCell(0, 2, 'AAA City');
        dropdownMenu(2);
        expect($(byValueBoxRootElement()).find('tr:nth-child(1)').text()).toEqual('AAA City');
      });
    });
  });
  describe('"action_bar" component', function () {
    it('should appear under dropdown menu',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuActionBar .htUIButtonOK input').value).toBe('OK');
      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuActionBar .htUIButtonCancel input').value).toBe('Cancel');
      yield sleep(300); // The filter components should be intact after some time. These expectations check whether the GhostTable
      // does not steal the components' element while recalculating column width (PR #5555).

      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuActionBar .htUIButtonOK input').value).toBe('OK');
      expect(dropdownMenuRootElement().querySelector('.htFiltersMenuActionBar .htUIButtonCancel input').value).toBe('Cancel');
    }));
  });
  describe('Cooperation with Manual Column Move plugin #32', function () {
    it('should work as expected after actions sequence: filtering column by value -> moving the column -> ' + 'filtering any other column by value', function () {
      var hot = handsontable({
        data: [{
          id: 1,
          name: 'Nannie Patel',
          address: 'BBB City'
        }, {
          id: 2,
          name: 'Leanne Ware',
          address: 'ZZZ City'
        }, {
          id: 3,
          name: 'Mathis Boone',
          address: 'CCC City'
        }, {
          id: 4,
          name: 'Heather Mcdaniel',
          address: 'DDD City'
        }],
        columns: [{
          data: 'id',
          type: 'numeric',
          title: 'ID'
        }, {
          data: 'name',
          type: 'text',
          title: 'Full name'
        }, {
          data: 'address',
          type: 'text',
          title: 'Address'
        }],
        dropdownMenu: true,
        manualColumnMove: true,
        filters: true,
        width: 500,
        height: 300
      });
      var manualColumnMove = hot.getPlugin('manualColumnMove'); // filtering first value of column (deselecting checkbox)

      dropdownMenu(0);
      $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click'); // moving column

      manualColumnMove.moveColumn(0, 2);
      hot.render(); // filtering first value of column (deselecting checkbox)

      dropdownMenu(2);
      $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      expect(getData().length).toEqual(2);
    });
    it('should work as expected after actions sequence: filtering column by value -> moving the column -> ' + 'filtering the column by value ', function () {
      var hot = handsontable({
        data: [{
          id: 1,
          name: 'Nannie Patel',
          address: 'BBB City'
        }, {
          id: 2,
          name: 'Leanne Ware',
          address: 'ZZZ City'
        }, {
          id: 3,
          name: 'Mathis Boone',
          address: 'CCC City'
        }, {
          id: 4,
          name: 'Heather Mcdaniel',
          address: 'DDD City'
        }],
        columns: [{
          data: 'id',
          type: 'numeric',
          title: 'ID'
        }, {
          data: 'name',
          type: 'text',
          title: 'Full name'
        }, {
          data: 'address',
          type: 'text',
          title: 'Address'
        }],
        dropdownMenu: true,
        manualColumnMove: true,
        filters: true,
        width: 500,
        height: 300
      });
      var manualColumnMove = hot.getPlugin('manualColumnMove'); // filtering first value of column (deselecting checkbox)

      dropdownMenu(0);
      $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click'); // moving column

      manualColumnMove.moveColumn(0, 2);
      hot.render(); // filtering second value of column (deselecting checkbox)

      dropdownMenu(1);
      $(byValueBoxRootElement()).find('tr:nth-child(2) :checkbox').simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      expect(getData().length).toEqual(2);
    });
  });
  it('should deselect all values in "Filter by value" after clicking "Clear" link', function (done) {
    handsontable({
      data: getDataForFilters(),
      columns: getColumnsForFilters(),
      filters: true,
      dropdownMenu: true,
      width: 500,
      height: 300
    });
    dropdownMenu(1);
    setTimeout(function () {
      $(dropdownMenuRootElement().querySelector('.htUIClearAll a')).simulate('click');
      expect(byValueMultipleSelect().items.map(function (o) {
        return o.checked;
      }).indexOf(true)).toBe(-1);
      done();
    }, 100);
  });
  it('should select all values in "Filter by value" after clicking "Select all" link', function (done) {
    handsontable({
      data: getDataForFilters(),
      columns: getColumnsForFilters(),
      filters: true,
      dropdownMenu: true,
      width: 500,
      height: 300
    });
    dropdownMenu(1);
    setTimeout(function () {
      $(dropdownMenuRootElement().querySelector('.htUIClearAll a')).simulate('click');
      expect(byValueMultipleSelect().items.map(function (o) {
        return o.checked;
      }).indexOf(true)).toBe(-1);
      $(dropdownMenuRootElement().querySelector('.htUISelectAll a')).simulate('click');
      expect(byValueMultipleSelect().items.map(function (o) {
        return o.checked;
      }).indexOf(false)).toBe(-1);
      done();
    }, 100);
  });
  it('should allow opening the filtering dropdown menu, when there are multiple Handsontable instances present', function () {
    handsontable({
      data: getDataForFilters(),
      columns: getColumnsForFilters(),
      filters: true,
      dropdownMenu: true,
      width: 500,
      height: 300
    });
    var hot2Container = document.createElement('DIV');
    document.body.appendChild(hot2Container);
    var hot2 = new Handsontable(hot2Container, {
      data: getDataForFilters(),
      columns: getColumnsForFilters(),
      filters: true,
      dropdownMenu: true,
      width: 500,
      height: 300
    });
    expect(document.querySelectorAll('.htDropdownMenu').length).toBe(2);
    dropdownMenu(1);
    closeDropdownMenu();
    expect(getPlugin('dropdownMenu').menu.container.style.display).toBe('block');
    expect(getPlugin('dropdownMenu').menu.container.parentElement).not.toBe(null);
    var th = hot2.view.wt.wtTable.getColumnHeader(1);
    var button = th.querySelector('.changeType');
    $(button).simulate('mousedown');
    $(button).simulate('mouseup');
    $(button).simulate('click');
    expect(hot2.getPlugin('dropdownMenu').menu.container.style.display).toBe('block');
    expect(hot2.getPlugin('dropdownMenu').menu.container.parentElement).not.toBe(null);
    hot2.destroy();
    hot2Container.parentElement.removeChild(hot2Container);
  });
  describe('Simple filtering (one column)', function () {
    it('should filter empty values and revert back after removing filter', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // is empty

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(3) td')).simulate('mousedown').simulate('mouseup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      expect(getData().length).toBe(0);
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // none

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(1) td')).simulate('mousedown').simulate('mouseup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      expect(getData().length).toBe(39);
    });
    it('should filter numeric value (greater than)', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      setTimeout(function () {
        // Greater than 12
        document.activeElement.value = '12';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toEqual(27);
        expect(getData()[0][0]).toBe(13);
        expect(getData()[0][1]).toBe('Dina Randolph');
        expect(getData()[0][2]).toBe('Henrietta');
        expect(getData()[0][3]).toBe('2014-04-29');
        expect(getData()[0][4]).toBe('blue');
        expect(getData()[0][5]).toBe(3827.99);
        expect(getDataAtCol(0).join()).toBe('13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39');
        done();
      }, 200);
    });
    it('should filter text value (contains)', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // contains

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(12) td')).simulate('mousedown').simulate('mouseup');
      setTimeout(function () {
        // Contains ej
        document.activeElement.value = 'ej';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toEqual(1);
        expect(getData()[0][0]).toBe(23);
        expect(getData()[0][1]).toBe('Mejia Osborne');
        expect(getData()[0][2]).toBe('Fowlerville');
        expect(getData()[0][3]).toBe('2014-05-24');
        expect(getData()[0][4]).toBe('blue');
        expect(getData()[0][5]).toBe(1852.34);
        expect(getData()[0][6]).toBe(false);
        expect(getDataAtCol(1).join()).toBe('Mejia Osborne');
        done();
      }, 200);
    });
    it('should filter date value (yesterday)', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(3);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // contains

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(15) td')).simulate('mousedown').simulate('mouseup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      expect(getData().length).toEqual(3);
      expect(getData()[0][0]).toBe(26);
      expect(getData()[0][1]).toBe('Stanton Britt');
      expect(getData()[0][2]).toBe('Nipinnawasee');
      expect(getData()[0][3]).toBe(moment().add(-1, 'days').format(FILTERS_DATE_FORMAT));
      expect(getData()[0][4]).toBe('green');
      expect(getData()[0][5]).toBe(3592.18);
      expect(getData()[0][6]).toBe(false);
      expect(getDataAtCol(3).join()).toBe([moment().add(-1, 'days').format(FILTERS_DATE_FORMAT), moment().add(-1, 'days').format(FILTERS_DATE_FORMAT), moment().add(-1, 'days').format(FILTERS_DATE_FORMAT)].join());
    });
    it('should filter boolean value (true)', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(6);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // contains

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(6) td')).simulate('mousedown').simulate('mouseup');
      setTimeout(function () {
        // Is equal to 'true'
        document.activeElement.value = 'true';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toEqual(18);
        expect(getData()[0][0]).toBe(1);
        expect(getData()[0][1]).toBe('Nannie Patel');
        expect(getData()[0][2]).toBe('Jenkinsville');
        expect(getData()[0][3]).toBe('2014-01-29');
        expect(getData()[0][4]).toBe('green');
        expect(getData()[0][5]).toBe(1261.60);
        expect(getData()[0][6]).toBe(true);
        expect(getDataAtCol(6).join()).toBe('true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true');
        done();
      }, 200);
    });
    it('should filter values using "by value" method', function (done) {
      handsontable({
        data: getDataForFilters().slice(0, 15),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(2);
      setTimeout(function () {
        // disable first 5 records
        $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
        $(byValueBoxRootElement()).find('tr:nth-child(2) :checkbox').simulate('click');
        $(byValueBoxRootElement()).find('tr:nth-child(3) :checkbox').simulate('click');
        $(byValueBoxRootElement()).find('tr:nth-child(4) :checkbox').simulate('click');
        $(byValueBoxRootElement()).find('tr:nth-child(5) :checkbox').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toEqual(10);
        expect(getDataAtCol(2).join()).toBe('Jenkinsville,Gardiner,Saranap,Soham,Needmore,Wakarusa,Yukon,Layhill,Henrietta,Wildwood');
        done();
      }, 200);
    });
    it('should overwrite condition filter when at specified column filter was already applied',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // eq

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(6) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Is equal to '5'

      document.activeElement.value = '5';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      expect(getData().length).toEqual(1);
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // lt

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(11) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Less than

      document.activeElement.value = '8';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toEqual(7);
    }));
    it('should filter values again when data was changed',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // lt

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(11) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Less than

      document.activeElement.value = '8';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      expect(getData().length).toBe(7);
      selectCell(3, 0);
      keyDownUp('enter');
      document.activeElement.value = '99';
      keyDownUp('enter');
      yield sleep(200);
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toBe(6);
    }));
    it('should filter values again when data was changed (filter by value)', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(2);
      setTimeout(function () {
        byValueMultipleSelect().setValue(['Bowie', 'Coral']);
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(2);
      }, 200);
      setTimeout(function () {
        byValueMultipleSelect().setValue(['Alamo', 'Coral', 'Canby']);
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getDataAtCol(2).join()).toBe('Alamo,Canby,Coral');
        done();
      }, 400);
    });
  });
  describe('Advanced filtering (multiple columns)', function () {
    it('should filter values from 3 columns',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(100); // Greater than 12

      document.activeElement.value = '12';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      dropdownMenu(2);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // begins_with

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(100);
      document.activeElement.value = 'b';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click'); // this condition needs extra time to apply filters

      yield sleep(10);
      dropdownMenu(4);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // eq

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(6) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(100);
      document.activeElement.value = 'green';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toEqual(2);
      expect(getData()[0][0]).toBe(17);
      expect(getData()[0][1]).toBe('Bridges Sawyer');
      expect(getData()[0][2]).toBe('Bowie');
      expect(getData()[0][3]).toBe('2015-06-28');
      expect(getData()[0][4]).toBe('green');
      expect(getData()[0][5]).toBe(1792.36);
      expect(getData()[0][6]).toBe(false);
      expect(getData()[1][0]).toBe(24);
      expect(getData()[1][1]).toBe('Greta Patterson');
      expect(getData()[1][2]).toBe('Bartonsville');
      expect(getData()[1][3]).toBe(moment().add(-2, 'days').format(FILTERS_DATE_FORMAT));
      expect(getData()[1][4]).toBe('green');
      expect(getData()[1][5]).toBe(2437.58);
      expect(getData()[1][6]).toBe(false);
    }));
    it('should filter values from 3 columns (2 conditional and 1 by value)',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Greater than 12

      document.activeElement.value = '12';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      dropdownMenu(2);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // begins_with

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200);
      document.activeElement.value = 'b';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      dropdownMenu(4); // uncheck first record

      $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
      yield sleep(200);
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toEqual(2);
      expect(getData()[0][0]).toBe(17);
      expect(getData()[0][1]).toBe('Bridges Sawyer');
      expect(getData()[0][2]).toBe('Bowie');
      expect(getData()[0][3]).toBe('2015-06-28');
      expect(getData()[0][4]).toBe('green');
      expect(getData()[0][5]).toBe(1792.36);
      expect(getData()[0][6]).toBe(false);
      expect(getData()[1][0]).toBe(24);
      expect(getData()[1][1]).toBe('Greta Patterson');
      expect(getData()[1][2]).toBe('Bartonsville');
      expect(getData()[1][3]).toBe(moment().add(-2, 'days').format(FILTERS_DATE_FORMAT));
      expect(getData()[1][4]).toBe('green');
      expect(getData()[1][5]).toBe(2437.58);
      expect(getData()[1][6]).toBe(false);
    }));
    it('should filter values from few columns (after change first column condition)',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Greater than 12

      document.activeElement.value = '12';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      dropdownMenu(2);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // begins_with

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200);
      document.activeElement.value = 'b';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click'); // Change first added filter condition. First added condition is responsible for defining data root chain.

      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // between

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(13) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200);
      var inputs = dropdownMenuRootElement().querySelectorAll('.htFiltersMenuCondition input');
      inputs[0].value = '1';
      inputs[1].value = '15';
      $(inputs[0]).simulate('keyup');
      $(inputs[1]).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toEqual(1);
      expect(getData()[0][0]).toBe(14);
      expect(getData()[0][1]).toBe('Helga Mathis');
      expect(getData()[0][2]).toBe('Brownsville');
      expect(getData()[0][3]).toBe('2015-03-22');
      expect(getData()[0][4]).toBe('brown');
      expect(getData()[0][5]).toBe(3917.34);
      expect(getData()[0][6]).toBe(true);
    }));
    it('should apply filtered values to the next "by value" component defined after edited conditions', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      setTimeout(function () {
        // Greater than 25
        document.activeElement.value = '25';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(2);
      }, 200);
      setTimeout(function () {
        // uncheck
        $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
        $(byValueBoxRootElement()).find('tr:nth-child(3) :checkbox').simulate('click');
        $(byValueBoxRootElement()).find('tr:nth-child(4) :checkbox').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(1);
      }, 400);
      setTimeout(function () {
        // uncheck
        $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
        $(byValueBoxRootElement()).find('tr:nth-child(2) :checkbox').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(byValueMultipleSelect().getItems().length).toBe(11);
        expect(byValueMultipleSelect().getValue().length).toBe(9);
        dropdownMenu(4);
      }, 600);
      setTimeout(function () {
        // uncheck
        $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
        $(byValueBoxRootElement()).find('tr:nth-child(2) :checkbox').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(byValueMultipleSelect().getItems().length).toBe(3);
        expect(byValueMultipleSelect().getValue().length).toBe(1);
        dropdownMenu(2);
      }, 800);
      setTimeout(function () {
        // check again (disable filter)
        $(byValueBoxRootElement()).find('tr:nth-child(1) :checkbox').simulate('click');
        $(byValueBoxRootElement()).find('tr:nth-child(3) :checkbox').simulate('click');
        $(byValueBoxRootElement()).find('tr:nth-child(4) :checkbox').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(1);
      }, 1000);
      setTimeout(function () {
        expect(byValueMultipleSelect().getItems().length).toBe(14);
        expect(byValueMultipleSelect().getValue().length).toBe(9);
        dropdownMenu(4);
      }, 1200);
      setTimeout(function () {
        // unchanged state for condition behind second condition
        expect(byValueMultipleSelect().getItems().length).toBe(3);
        expect(byValueMultipleSelect().getValue().length).toBe(1);
        done();
      }, 1500);
    });
  });
  describe('Advanced filtering (conditions and operations combination #160)', function () {
    it('should filter data properly when `disjunction` operation was chosen and ' + 'only one conditional was selected', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(conditionSelectRootElements().first).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      setTimeout(function () {
        document.activeElement.value = 'm';
        $(document.activeElement).simulate('keyup'); // disjunction

        $(conditionRadioInput(1).element).find('input[type="radio"]').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toBe(5);
        done();
      }, 300);
    });
    it('should not change data when operation was changed from `disjunction` to `conjunction` ' + 'after filtering data by only one condition', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(conditionSelectRootElements().first).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      setTimeout(function () {
        document.activeElement.value = 'm';
        $(document.activeElement).simulate('keyup'); // conjunction

        $(conditionRadioInput(1).element).find('input[type="radio"]').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(1);
      }, 300);
      setTimeout(function () {
        expect(getData().length).toBe(5); // disjunction

        $(conditionRadioInput(0).element).find('input[type="radio"]').simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      }, 600);
      setTimeout(function () {
        expect(getData().length).toBe(5);
        done();
      }, 900);
    });
    it('should filter data properly after changing operator (`conjunction` <-> `disjunction` operation)',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(conditionSelectRootElements().first).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      yield sleep(300);
      document.activeElement.value = 'm';
      $(document.activeElement).simulate('keyup');
      $(conditionSelectRootElements().second).simulate('click');
      $(conditionMenuRootElements().second).find('tbody td:contains("Ends with")').simulate('mousedown').simulate('mouseup');
      yield sleep(300);
      document.activeElement.value = 'e';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      expect(getData().length).toBe(3);
      dropdownMenu(1);
      yield sleep(300); // disjunction

      $(conditionRadioInput(1).element).find('input[type="radio"]').simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      expect(getData().length).toBe(7);
      dropdownMenu(1);
      yield sleep(300); // conjunction

      $(conditionRadioInput(0).element).find('input[type="radio"]').simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      expect(getData().length).toBe(3);
    }));
    it('should filter data properly after clearing second input', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(conditionSelectRootElements().first).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      setTimeout(function () {
        document.activeElement.value = 'm';
        $(document.activeElement).simulate('keyup');
        $(conditionSelectRootElements().second).simulate('click');
        $(conditionMenuRootElements().second).find('tbody td:contains("Ends with")').simulate('mousedown').simulate('mouseup');
      }, 300);
      setTimeout(function () {
        document.activeElement.value = 'e';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      }, 600);
      setTimeout(function () {
        dropdownMenu(1);
      }, 900);
      setTimeout(function () {
        document.activeElement.value = '';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      }, 1200);
      setTimeout(function () {
        expect(getData().length).toBe(5);
        done();
      }, 1500);
    });
    it('should filter data properly after resetting second condition `SelectUI` (value set to `None`)', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(conditionSelectRootElements().first).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      setTimeout(function () {
        document.activeElement.value = 'm';
        $(document.activeElement).simulate('keyup');
        $(conditionSelectRootElements().second).simulate('click');
        $(conditionMenuRootElements().second).find('tbody td:contains("Ends with")').simulate('mousedown').simulate('mouseup');
      }, 300);
      setTimeout(function () {
        document.activeElement.value = 'e';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      }, 600);
      setTimeout(function () {
        dropdownMenu(1);
      }, 900);
      setTimeout(function () {
        $(conditionSelectRootElements().second).simulate('click');
        $(conditionMenuRootElements().second).find('tbody td:contains("None")').simulate('mousedown').simulate('mouseup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      }, 1200);
      setTimeout(function () {
        expect(getData().length).toBe(5);
        expect($(conditionSelectRootElements().second).text()).toEqual('None');
        done();
      }, 1500);
    });
  });
  describe('Advanced filtering (conditions, operations and "by value" component #160)', function () {
    it('First conditional chosen -> filter operation -> unchecked first value from multiple select -> selected `disjunction` operation -> filter operation',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(conditionSelectRootElements().first).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      yield sleep(200);
      document.activeElement.value = 'm';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toBe(5);
      dropdownMenu(1);
      yield sleep(200);
      var $multipleSelectElements = $(byValueMultipleSelect().element.querySelectorAll('.htUIMultipleSelectHot td input'));
      $multipleSelectElements.eq(0).simulate('click'); // disjunction

      $(conditionRadioInput(1).element).find('input[type="radio"]').simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toBe(4);
    }));
    it('Two conditionals chosen -> filter operation -> unchecked first value from multiple select -> filter operation',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(conditionSelectRootElements().first).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      yield sleep(200);
      document.activeElement.value = 'm';
      $(document.activeElement).simulate('keyup');
      $(conditionSelectRootElements().second).simulate('click');
      $(conditionMenuRootElements().second).find('tbody td:contains("Ends with")').simulate('mousedown').simulate('mouseup');
      yield sleep(200);
      document.activeElement.value = 'e';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      dropdownMenu(1);
      yield sleep(200);
      var $multipleSelectElements = $(byValueMultipleSelect().element.querySelectorAll('.htUIMultipleSelectHot td input'));
      $multipleSelectElements.eq(0).simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toBe(2);
    }));
    it('Two conditionals chosen & unchecked value which will be filtered by conditions -> filter operation',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(conditionSelectRootElements().first).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      yield sleep(200);
      document.activeElement.value = 'm';
      $(document.activeElement).simulate('keyup');
      $(conditionSelectRootElements().second).simulate('click');
      $(conditionMenuRootElements().second).find('tbody td:contains("Ends with")').simulate('mousedown').simulate('mouseup');
      yield sleep(200);
      document.activeElement.value = 'e';
      $(document.activeElement).simulate('keyup');
      var $multipleSelectElements = $(byValueMultipleSelect().element.querySelectorAll('.htUIMultipleSelectHot td input')); // Alice Blake

      $multipleSelectElements.eq(0).simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toBe(3);
    }));
    it('Two conditionals chosen & unchecked value which won\'t be filtered by conditions -> filter operation',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(conditionSelectRootElements().first).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      yield sleep(200);
      document.activeElement.value = 'm';
      $(document.activeElement).simulate('keyup');
      $(conditionSelectRootElements().second).simulate('click');
      $(conditionMenuRootElements().second).find('tbody td:contains("Ends with")').simulate('mousedown').simulate('mouseup');
      yield sleep(200);
      document.activeElement.value = 'e';
      $(document.activeElement).simulate('keyup');
      var $multipleSelectElements = $(byValueMultipleSelect().element.querySelectorAll('.htUIMultipleSelectHot td input'));
      $multipleSelectElements.get(4).scrollIntoView();
      $multipleSelectElements = $(byValueMultipleSelect().element.querySelectorAll('.htUIMultipleSelectHot td input'));
      $multipleSelectElements.get(8).scrollIntoView();
      $multipleSelectElements = $(byValueMultipleSelect().element.querySelectorAll('.htUIMultipleSelectHot td input'));
      $multipleSelectElements.get(12).scrollIntoView();
      $multipleSelectElements = $(byValueMultipleSelect().element.querySelectorAll('.htUIMultipleSelectHot td input'));
      $multipleSelectElements.get(13).scrollIntoView();
      $multipleSelectElements = $(byValueMultipleSelect().element.querySelectorAll('.htUIMultipleSelectHot td input')); // Mathis Boone, 23th element

      $multipleSelectElements.eq(9).simulate('click');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toBe(2);
    }));
  });
  describe('API + UI #116', function () {
    it('should change state of components by plugin function calls', function (done) {
      var hot = handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var plugin = hot.getPlugin('filters');
      plugin.addCondition(1, 'begins_with', ['m'], 'conjunction');
      plugin.addCondition(1, 'ends_with', ['e'], 'conjunction');
      plugin.filter();
      dropdownMenu(1);
      setTimeout(function () {
        expect($(conditionSelectRootElements().first).text()).toEqual('Begins with');
        expect($(conditionSelectRootElements().second).text()).toEqual('Ends with');
        expect($(conditionRadioInput(0).element).parent().find(':checked').parent().text()).toEqual('And');
        done();
      }, 200);
    });
    it('should not change state of components and data after clicking `OK` button', function (done) {
      var hot = handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var plugin = hot.getPlugin('filters');
      plugin.addCondition(1, 'begins_with', ['m'], 'disjunction');
      plugin.addCondition(1, 'ends_with', ['e'], 'disjunction');
      plugin.filter();
      var dataLength = getData().length;
      dropdownMenu(1);
      setTimeout(function () {
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(1);
      }, 200);
      setTimeout(function () {
        expect(getData().length).toEqual(dataLength);
        expect($(conditionSelectRootElements().first).text()).toEqual('Begins with');
        expect($(conditionSelectRootElements().second).text()).toEqual('Ends with');
        expect($(conditionRadioInput(0).element).parent().find(':checked').parent().text()).toEqual('Or');
        done();
      }, 400);
    });
    it('should allow to perform changes on conditions by UI, when they were added by API before #1', function (done) {
      var hot = handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var plugin = hot.getPlugin('filters');
      plugin.addCondition(1, 'begins_with', ['m'], 'disjunction');
      plugin.filter();
      var dateLength = getData().length;
      dropdownMenu(1);
      setTimeout(function () {
        var $multipleSelectElements = $(byValueMultipleSelect().element.querySelectorAll('.htUIMultipleSelectHot td input'));
        $multipleSelectElements.eq(0).simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(1);
      }, 200);
      setTimeout(function () {
        expect($(conditionSelectRootElements().first).text()).toEqual('Begins with');
        expect($(conditionSelectRootElements().second).text()).toEqual('None'); // original state (now performing `conjunction` operation)

        expect($(conditionRadioInput(0).element).parent().find(':checked').parent().text()).toEqual('Or');
        expect(getData().length).toEqual(dateLength - 1);
        done();
      }, 400);
    });
    it('should allow to perform changes on conditions by UI, when they were added by API before #1', function (done) {
      var hot = handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var plugin = hot.getPlugin('filters');
      plugin.addCondition(1, 'begins_with', ['m'], 'disjunction');
      plugin.addCondition(1, 'ends_with', ['e'], 'disjunction');
      plugin.filter();
      var dateLength = getData().length;
      dropdownMenu(1);
      setTimeout(function () {
        var $multipleSelectElements = $(byValueMultipleSelect().element.querySelectorAll('.htUIMultipleSelectHot td input'));
        $multipleSelectElements.eq(0).simulate('click');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        dropdownMenu(1);
      }, 200);
      setTimeout(function () {
        expect($(conditionSelectRootElements().first).text()).toEqual('Begins with');
        expect($(conditionSelectRootElements().second).text()).toEqual('Ends with'); // original state (now performing `disjunctionWithExtraCondition` operation)

        expect($(conditionRadioInput(0).element).parent().find(':checked').parent().text()).toEqual('Or');
        expect(getData().length).toEqual(dateLength - 1);
        done();
      }, 400);
    });
  });
  describe('Sorting', function () {
    it('should filter values when sorting is applied',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        columnSorting: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Greater than 12

      document.activeElement.value = '12';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click'); // sort

      getHtCore().find('th span.columnSorting:eq(2)').simulate('mousedown');
      getHtCore().find('th span.columnSorting:eq(2)').simulate('mouseup');
      getHtCore().find('th span.columnSorting:eq(2)').simulate('click');
      dropdownMenu(2);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // begins_with

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Begins with 'b'

      document.activeElement.value = 'b';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toEqual(3);
      expect(getData()[0][0]).toBe(24);
      expect(getData()[1][0]).toBe(17);
      expect(getData()[2][0]).toBe(14);
    }));
    it('should correctly remove rows from filtered values when sorting is applied', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        columnSorting: true,
        width: 500,
        height: 300
      });
      setTimeout(function () {
        dropdownMenu(0);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      }, 300);
      setTimeout(function () {
        // Greater than 12
        $(conditionSelectRootElements().first).next().find('input')[0].focus();
        document.activeElement.value = '12';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click'); // sort

        getHtCore().find('th span.columnSorting:eq(2)').simulate('mousedown');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('mouseup');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('click');
        alter('remove_row', 1, 5);
        dropdownMenu(2);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // ends_with

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(10) td')).simulate('mousedown').simulate('mouseup');
      }, 600);
      setTimeout(function () {
        // Ends with 'e'
        $(conditionSelectRootElements().first).next().find('input')[0].focus();
        document.activeElement.value = 'e';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toEqual(7);
        expect(getDataAtCol(0).join()).toBe('24,16,23,32,26,28,21');
        alter('remove_row', 1, 5);
        expect(getData().length).toEqual(2);
        expect(getDataAtCol(0).join()).toBe('24,21');
        dropdownMenu(0);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // none

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(1) td')).simulate('mousedown').simulate('mouseup');
      }, 900);
      setTimeout(function () {
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toEqual(5);
        expect(getDataAtCol(0).join()).toBe('24,10,1,6,21');
        done();
      }, 1200);
    });
    it('should correctly insert rows into filtered values when sorting is applied', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        columnSorting: true,
        width: 500,
        height: 300
      });
      setTimeout(function () {
        dropdownMenu(0);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      }, 300);
      setTimeout(function () {
        // Greater than 12
        $(conditionSelectRootElements().first).next().find('input')[0].focus();
        document.activeElement.value = '12';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click'); // sort

        getHtCore().find('th span.columnSorting:eq(2)').simulate('mousedown');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('mouseup');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('click');
        alter('insert_row', 1, 5);
        dropdownMenu(2);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // ends_with

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(10) td')).simulate('mousedown').simulate('mouseup');
      }, 600);
      setTimeout(function () {
        // Ends with 'e'
        $(conditionSelectRootElements().first).next().find('input')[0].focus();
        document.activeElement.value = 'e';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toBe(9);
        expect(getDataAtCol(0).join()).toBe('24,17,14,16,23,32,26,28,21');
        alter('insert_row', 1, 1);
        expect(getData().length).toBe(10);
        expect(getDataAtCol(0).join()).toBe('24,,17,14,16,23,32,26,28,21');
        dropdownMenu(0);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // is empty

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(3) td')).simulate('mousedown').simulate('mouseup');
      }, 900);
      setTimeout(function () {
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toBe(0);
        done();
      }, 1200);
    });
  });
  describe('Multi-column sorting', function () {
    it('should filter values when sorting is applied',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        multiColumnSorting: true,
        width: 500,
        height: 300
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Greater than 12

      document.activeElement.value = '12';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click'); // sort

      getHtCore().find('th span.columnSorting:eq(2)').simulate('mousedown');
      getHtCore().find('th span.columnSorting:eq(2)').simulate('mouseup');
      getHtCore().find('th span.columnSorting:eq(2)').simulate('click');
      dropdownMenu(2);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // begins_with

      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      yield sleep(200); // Begins with 'b'

      document.activeElement.value = 'b';
      $(document.activeElement).simulate('keyup');
      $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      yield sleep(10);
      expect(getData().length).toEqual(3);
      expect(getData()[0][0]).toBe(24);
      expect(getData()[1][0]).toBe(17);
      expect(getData()[2][0]).toBe(14);
    }));
    it('should correctly remove rows from filtered values when sorting is applied', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        multiColumnSorting: true,
        width: 500,
        height: 300
      });
      setTimeout(function () {
        dropdownMenu(0);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      }, 300);
      setTimeout(function () {
        // Greater than 12
        $(conditionSelectRootElements().first).next().find('input')[0].focus();
        document.activeElement.value = '12';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click'); // sort

        getHtCore().find('th span.columnSorting:eq(2)').simulate('mousedown').simulate('mouseup');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('mouseup');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('click');
        alter('remove_row', 1, 5);
        dropdownMenu(2);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // ends_with

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(10) td')).simulate('mousedown').simulate('mouseup');
      }, 600);
      setTimeout(function () {
        // Ends with 'e'
        $(conditionSelectRootElements().first).next().find('input')[0].focus();
        document.activeElement.value = 'e';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toEqual(7);
        expect(getDataAtCol(0).join()).toBe('24,16,23,32,26,28,21');
        alter('remove_row', 1, 5);
        expect(getData().length).toEqual(2);
        expect(getDataAtCol(0).join()).toBe('24,21');
        dropdownMenu(0);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // none

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(1) td')).simulate('mousedown').simulate('mouseup');
      }, 900);
      setTimeout(function () {
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toEqual(5);
        expect(getDataAtCol(0).join()).toBe('24,10,1,6,21');
        done();
      }, 1200);
    });
    it('should correctly insert rows into filtered values when sorting is applied', function (done) {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        dropdownMenu: true,
        filters: true,
        multiColumnSorting: true,
        width: 500,
        height: 300
      });
      setTimeout(function () {
        dropdownMenu(0);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // gt

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown').simulate('mouseup');
      }, 300);
      setTimeout(function () {
        // Greater than 12
        $(conditionSelectRootElements().first).next().find('input')[0].focus();
        document.activeElement.value = '12';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click'); // sort

        getHtCore().find('th span.columnSorting:eq(2)').simulate('mousedown');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('mouseup');
        getHtCore().find('th span.columnSorting:eq(2)').simulate('click');
        alter('insert_row', 1, 5);
        dropdownMenu(2);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // ends_with

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(10) td')).simulate('mousedown').simulate('mouseup');
      }, 600);
      setTimeout(function () {
        // Ends with 'e'
        $(conditionSelectRootElements().first).next().find('input')[0].focus();
        document.activeElement.value = 'e';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toBe(9);
        expect(getDataAtCol(0).join()).toBe('24,17,14,16,23,32,26,28,21');
        alter('insert_row', 1, 1);
        expect(getData().length).toBe(10);
        expect(getDataAtCol(0).join()).toBe('24,,17,14,16,23,32,26,28,21');
        dropdownMenu(0);
        $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click'); // is empty

        $(conditionMenuRootElements().first.querySelector('tbody :nth-child(3) td')).simulate('mousedown').simulate('mouseup');
      }, 900);
      setTimeout(function () {
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
        expect(getData().length).toBe(0);
        done();
      }, 1200);
    });
  });
  describe('should display components inside filters dropdownMenu properly', function () {
    it('should not display extra condition element at start', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(false);
    });
    it('should show extra condition element after specific conditional options menu click', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      expect($(dropdownMenuRootElement()).is(':visible')).toBe(true);
      expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(true);
    });
    it('should not show extra condition element after specific conditional options menu click', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("None")').simulate('mousedown').simulate('mouseup');
      expect($(dropdownMenuRootElement()).is(':visible')).toBe(true);
      expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(false);
    });
    it('should hide extra condition element after specific conditional options menu click', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Is equal to")').simulate('mousedown').simulate('mouseup');
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("None")').simulate('mousedown').simulate('mouseup');
      expect($(dropdownMenuRootElement()).is(':visible')).toBe(true);
      expect($(conditionMenuRootElements().first).is(':visible')).toBe(false);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(false);
    });
    it('should not show extra condition elements after changing value of cell when conditions wasn\'t set' + '(`conditionUpdateObserver` triggers hook)', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      selectCell(3, 0);
      keyDownUp('enter');
      document.activeElement.value = '99';
      keyDownUp('enter');
      dropdownMenu(1);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(false);
      expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(false);
    });
    it('should show proper condition elements after changing value of cell when condition was set' + '(`conditionUpdateObserver` triggers hook)', function () {
      var hot = handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        filters: true,
        dropdownMenu: true,
        width: 500,
        height: 300
      });
      var filters = hot.getPlugin('filters');
      filters.addCondition(1, 'gte', [10]);
      filters.filter();
      selectCell(3, 0);
      keyDownUp('enter');
      document.activeElement.value = '99';
      keyDownUp('enter');
      dropdownMenu(1);
      expect($(conditionSelectRootElements().first).is(':visible')).toBe(true);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(true);
      expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(true);
    });
    it('should update components properly after API action #1', function () {
      var hot = handsontable({
        data: [{
          id: 2,
          name: 'Leanne Ware',
          address: 'AAA City'
        }, {
          id: 3,
          name: 'Mathis Boone',
          address: 'BBB City'
        }, {
          id: 1,
          name: 'Nannie Patel',
          address: 'CCC City'
        }],
        columns: [{
          data: 'id',
          type: 'numeric',
          title: 'ID'
        }, {
          data: 'name',
          type: 'text',
          title: 'Full name'
        }, {
          data: 'address',
          type: 'text',
          title: 'Address'
        }],
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var filters = hot.getPlugin('filters');
      filters.addCondition(1, 'by_value', [['Nannie Patel', 'Leanne Ware']]);
      filters.addCondition(1, 'contains', ['a']);
      filters.addCondition(1, 'not_contains', ['z']);
      filters.filter();
      dropdownMenu(1);
      var checkboxes = $(byValueBoxRootElement()).find(':checkbox').toArray();
      var checkedArray = checkboxes.map(function (element) {
        return element.checked;
      });
      expect(checkedArray).toEqual([true, false, true]);
      expect($(conditionSelectRootElements().first).text()).toEqual('Contains');
      expect($(conditionSelectRootElements().second).text()).toEqual('Does not contain');
      expect($(conditionSelectRootElements().first).is(':visible')).toBe(true);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(true);
      expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(true);
    });
    it('should update components properly after API action #2', function () {
      var hot = handsontable({
        data: [{
          id: 2,
          name: 'Leanne Ware',
          address: 'AAA City'
        }, {
          id: 3,
          name: 'Mathis Boone',
          address: 'BBB City'
        }, {
          id: 1,
          name: 'Nannie Patel',
          address: 'CCC City'
        }],
        columns: [{
          data: 'id',
          type: 'numeric',
          title: 'ID'
        }, {
          data: 'name',
          type: 'text',
          title: 'Full name'
        }, {
          data: 'address',
          type: 'text',
          title: 'Address'
        }],
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var filters = hot.getPlugin('filters');
      filters.addCondition(1, 'contains', ['a']);
      filters.addCondition(1, 'not_contains', ['z']);
      filters.addCondition(1, 'by_value', [['Nannie Patel', 'Leanne Ware']]);
      filters.filter();
      dropdownMenu(1);
      var checkboxes = $(byValueBoxRootElement()).find(':checkbox').toArray();
      var checkedArray = checkboxes.map(function (element) {
        return element.checked;
      });
      expect(checkedArray).toEqual([true, false, true]);
      expect($(conditionSelectRootElements().first).text()).toEqual('Contains');
      expect($(conditionSelectRootElements().second).text()).toEqual('Does not contain');
      expect($(conditionSelectRootElements().first).is(':visible')).toBe(true);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(true);
      expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(true);
    });
    it('should update components properly after API action #3', function () {
      var hot = handsontable({
        data: [{
          id: 2,
          name: 'Leanne Ware',
          address: 'AAA City'
        }, {
          id: 3,
          name: 'Mathis Boone',
          address: 'BBB City'
        }, {
          id: 1,
          name: 'Nannie Patel',
          address: 'CCC City'
        }],
        columns: [{
          data: 'id',
          type: 'numeric',
          title: 'ID'
        }, {
          data: 'name',
          type: 'text',
          title: 'Full name'
        }, {
          data: 'address',
          type: 'text',
          title: 'Address'
        }],
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var filters = hot.getPlugin('filters');
      filters.addCondition(1, 'contains', ['a']);
      filters.addCondition(1, 'by_value', [['Nannie Patel', 'Leanne Ware']]);
      filters.addCondition(1, 'not_contains', ['z']);
      filters.filter();
      dropdownMenu(1);
      var checkboxes = $(byValueBoxRootElement()).find(':checkbox').toArray();
      var checkedArray = checkboxes.map(function (element) {
        return element.checked;
      });
      expect(checkedArray).toEqual([true, false, true]);
      expect($(conditionSelectRootElements().first).text()).toEqual('Contains');
      expect($(conditionSelectRootElements().second).text()).toEqual('Does not contain');
      expect($(conditionSelectRootElements().first).is(':visible')).toBe(true);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(true);
      expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(true);
    });
    it('should update components properly after API action #4', function () {
      var hot = handsontable({
        data: [{
          id: 2,
          name: 'Leanne Ware',
          address: 'AAA City'
        }, {
          id: 3,
          name: 'Mathis Boone',
          address: 'BBB City'
        }, {
          id: 1,
          name: 'Nannie Patel',
          address: 'CCC City'
        }],
        columns: [{
          data: 'id',
          type: 'numeric',
          title: 'ID'
        }, {
          data: 'name',
          type: 'text',
          title: 'Full name'
        }, {
          data: 'address',
          type: 'text',
          title: 'Address'
        }],
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var filters = hot.getPlugin('filters');
      filters.addCondition(1, 'by_value', [['Nannie Patel', 'Leanne Ware']]);
      filters.addCondition(1, 'contains', ['a']);
      filters.filter();
      dropdownMenu(1);
      var checkboxes = $(byValueBoxRootElement()).find(':checkbox').toArray();
      var checkedArray = checkboxes.map(function (element) {
        return element.checked;
      });
      expect(checkedArray).toEqual([true, false, true]);
      expect($(conditionSelectRootElements().first).text()).toEqual('Contains');
      expect($(conditionSelectRootElements().second).text()).toEqual('None');
      expect($(conditionSelectRootElements().first).is(':visible')).toBe(true);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(true);
      expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(true);
    });
    it('should update components properly after API action #5', function () {
      var hot = handsontable({
        data: [{
          id: 2,
          name: 'Leanne Ware',
          address: 'AAA City'
        }, {
          id: 3,
          name: 'Mathis Boone',
          address: 'BBB City'
        }, {
          id: 1,
          name: 'Nannie Patel',
          address: 'CCC City'
        }],
        columns: [{
          data: 'id',
          type: 'numeric',
          title: 'ID'
        }, {
          data: 'name',
          type: 'text',
          title: 'Full name'
        }, {
          data: 'address',
          type: 'text',
          title: 'Address'
        }],
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var filters = hot.getPlugin('filters');
      filters.addCondition(1, 'by_value', [['Nannie Patel', 'Leanne Ware']]);
      filters.filter();
      dropdownMenu(1);
      var checkboxes = $(byValueBoxRootElement()).find(':checkbox').toArray();
      var checkedArray = checkboxes.map(function (element) {
        return element.checked;
      });
      expect(checkedArray).toEqual([true, false, true]);
      expect($(conditionSelectRootElements().first).text()).toEqual('None');
      expect($(conditionSelectRootElements().second).text()).toEqual('None');
      expect($(conditionSelectRootElements().first).is(':visible')).toBe(true);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(false);
      expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(false);
    });
    it('should show last operation which was added from API and can be shown inside `dropdownMenu` #1', function () {
      var hot = handsontable({
        data: [{
          id: 2,
          name: 'Leanne Ware',
          address: 'AAA City'
        }, {
          id: 3,
          name: 'Mathis Boone',
          address: 'BBB City'
        }, {
          id: 1,
          name: 'Nannie Patel',
          address: 'CCC City'
        }],
        columns: [{
          data: 'id',
          type: 'numeric',
          title: 'ID'
        }, {
          data: 'name',
          type: 'text',
          title: 'Full name'
        }, {
          data: 'address',
          type: 'text',
          title: 'Address'
        }],
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var filters = hot.getPlugin('filters');
      filters.addCondition(1, 'contains', ['e']);
      filters.addCondition(1, 'not_contains', ['z']);
      filters.addCondition(1, 'not_empty', []);
      filters.addCondition(1, 'by_value', [['Nannie Patel', 'Leanne Ware']]);
      filters.filter();
      dropdownMenu(1);
      var checkboxes = $(byValueBoxRootElement()).find(':checkbox').toArray();
      var checkedArray = checkboxes.map(function (element) {
        return element.checked;
      }); // Watch out! Filters build values inside `by_value` (checkbox inputs) component basing on all applied filters

      expect(checkedArray).toEqual([true, true]);
      expect($(conditionSelectRootElements().first).text()).toEqual('Contains');
      expect($(conditionSelectRootElements().second).text()).toEqual('Does not contain');
      expect($(conditionSelectRootElements().first).is(':visible')).toBe(true);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(true);
      expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(true);
    });
    it('should show last operation which was added from API and can be shown inside `dropdownMenu` #2', function () {
      var hot = handsontable({
        data: [{
          id: 2,
          name: 'Leanne Ware',
          address: 'AAA City'
        }, {
          id: 3,
          name: 'Mathis Boone',
          address: 'BBB City'
        }, {
          id: 1,
          name: 'Nannie Patel',
          address: 'CCC City'
        }],
        columns: [{
          data: 'id',
          type: 'numeric',
          title: 'ID'
        }, {
          data: 'name',
          type: 'text',
          title: 'Full name'
        }, {
          data: 'address',
          type: 'text',
          title: 'Address'
        }],
        dropdownMenu: true,
        filters: true,
        width: 500,
        height: 300
      });
      var filters = hot.getPlugin('filters');
      filters.addCondition(1, 'by_value', [['Nannie Patel', 'Leanne Ware']]);
      filters.addCondition(1, 'by_value', [['Mathis Boone']]);
      filters.filter();
      dropdownMenu(1);
      var checkboxes = $(byValueBoxRootElement()).find(':checkbox').toArray();
      var checkedArray = checkboxes.map(function (element) {
        return element.checked;
      });
      expect(checkedArray).toEqual([true, false, true]);
      expect($(conditionSelectRootElements().first).text()).toEqual('None');
      expect($(conditionSelectRootElements().second).text()).toEqual('None');
      expect($(conditionSelectRootElements().first).is(':visible')).toBe(true);
      expect($(conditionSelectRootElements().second).is(':visible')).toBe(false);
      expect($(conditionRadioInput(0).element).parent().is(':visible')).toBe(false);
    });
  });
  it('should inherit font family and size from body', function () {
    handsontable({
      data: getDataForFilters(),
      colHeaders: true,
      filters: true,
      dropdownMenu: true
    });
    var body = document.body;
    var bodyStyle = body.style;
    var fontFamily = bodyStyle.fontFamily;
    var fontSize = bodyStyle.fontSize;
    bodyStyle.fontFamily = 'Helvetica';
    bodyStyle.fontSize = '24px';
    dropdownMenu(0);
    var htItemWrapper = document.querySelector('.htItemWrapper');
    var compStyleHtItemWrapper = Handsontable.dom.getComputedStyle(htItemWrapper);
    var htFiltersMenuLabel = document.querySelector('.htFiltersMenuLabel');
    var compStyleHtFiltersMenuLabel = Handsontable.dom.getComputedStyle(htFiltersMenuLabel);
    var htUISelectCaption = document.querySelector('.htUISelectCaption');
    var compStyleHtUISelectCaption = Handsontable.dom.getComputedStyle(htUISelectCaption);
    expect(compStyleHtItemWrapper.fontFamily).toBe('Helvetica');
    expect(compStyleHtItemWrapper.fontSize).toBe('24px');
    expect(compStyleHtFiltersMenuLabel.fontFamily).toBe('Helvetica');
    expect(compStyleHtFiltersMenuLabel.fontSize).toBe('18px');
    expect(compStyleHtUISelectCaption.fontFamily).toBe('Helvetica');
    expect(compStyleHtUISelectCaption.fontSize).toBe('16.8px');
    bodyStyle.fontFamily = fontFamily;
    bodyStyle.fontSize = fontSize;
  });
  describe('Dimensions of filter\'s elements inside drop-down menu', function () {
    it('should scale text input showed after condition selection (pixel perfect)', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        colHeaders: true,
        dropdownMenu: {
          items: {
            custom: {
              name: 'This is very long text which should expand the drop-down menu...'
            },
            filter_by_condition: {},
            filter_operators: {},
            filter_by_condition2: {},
            filter_by_value: {}
          }
        },
        filters: true
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      var widthOfMenu = $(dropdownMenuRootElement()).find('table.htCore').width();
      var widthOfInput = $(dropdownMenuRootElement()).find('input').width();
      var bothInputBorders = 2;
      var bothInputPaddings = 8;
      var bothWrapperMargins = 20;
      var bothCustomRendererPaddings = 12;
      var parentsPaddings = bothInputBorders + bothInputPaddings + bothWrapperMargins + bothCustomRendererPaddings;
      expect(widthOfInput).toEqual(widthOfMenu - parentsPaddings);
    });
    it('should scale a condition select (pixel perfect)', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        colHeaders: true,
        dropdownMenu: {
          items: {
            custom: {
              name: 'This is very long text which should expand the drop-down menu...'
            },
            filter_by_condition: {},
            filter_operators: {},
            filter_by_condition2: {},
            filter_by_value: {}
          }
        },
        filters: true
      });
      dropdownMenu(1);
      var widthOfMenu = $(dropdownMenuRootElement()).find('table.htCore').width();
      var widthOfSelect = $(conditionSelectRootElements().first).width();
      var bothWrapperMargins = 20;
      var bothCustomRendererPaddings = 12;
      var parentsPaddings = bothWrapperMargins + bothCustomRendererPaddings;
      expect(widthOfSelect).toEqual(widthOfMenu - parentsPaddings);
    });
    it('should scale search input of the value box (pixel perfect)', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        colHeaders: true,
        dropdownMenu: {
          items: {
            custom: {
              name: 'This is very long text which should expand the drop-down menu...'
            },
            filter_by_condition: {},
            filter_operators: {},
            filter_by_condition2: {},
            filter_by_value: {}
          }
        },
        filters: true
      });
      dropdownMenu(1);
      var widthOfMenu = $(dropdownMenuRootElement()).find('table.htCore').width();
      var widthOfInput = $(dropdownMenuRootElement()).find('.htUIMultipleSelectSearch input').width();
      var bothInputBorders = 2;
      var bothInputPaddings = 8;
      var bothWrapperMargins = 20;
      var bothCustomRendererPaddings = 12;
      var parentsPaddings = bothInputBorders + bothInputPaddings + bothWrapperMargins + bothCustomRendererPaddings;
      expect(widthOfInput).toEqual(widthOfMenu - parentsPaddings);
    });
    it('should scale the value box element (pixel perfect)', function () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        colHeaders: true,
        dropdownMenu: {
          items: {
            custom: {
              name: 'This is very long text which should expand the drop-down menu...'
            },
            filter_by_condition: {},
            filter_operators: {},
            filter_by_condition2: {},
            filter_by_value: {}
          }
        },
        filters: true
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      var widthOfMenu = $(dropdownMenuRootElement()).find('table.htCore').width();
      var widthOfValueBox = $(byValueBoxRootElement()).width();
      var bothWrapperMargins = 20;
      var bothCustomRendererPaddings = 12;
      var parentsPaddings = bothWrapperMargins + bothCustomRendererPaddings;
      expect(widthOfValueBox).toEqual(widthOfMenu - parentsPaddings);
    });
    it('should fit the single value to the value box element (pixel perfect)',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: getDataForFilters(),
        columns: getColumnsForFilters(),
        colHeaders: true,
        dropdownMenu: {
          items: {
            custom: {
              name: 'This is very long text which should expand the drop-down menu...'
            },
            filter_by_condition: {},
            filter_operators: {},
            filter_by_condition2: {},
            filter_by_value: {}
          }
        },
        filters: true
      });
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      $(conditionMenuRootElements().first).find('tbody td:contains("Begins with")').simulate('mousedown').simulate('mouseup');
      var widthOfValueBoxWithoutScroll = $(byValueBoxRootElement()).find('.wtHolder')[0].scrollWidth;
      var widthOfSingleValue = $(byValueBoxRootElement()).find('table.htCore tr:eq(0)').width();
      expect(widthOfSingleValue).toEqual(widthOfValueBoxWithoutScroll);
    }));
    it('should display proper width of value box after change of another elements width to lower ' + '(bug: once rendered `MultipleSelectUI` has elbowed the table created by AutoColumnSize plugin)',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      var hot = handsontable({
        colHeaders: true,
        dropdownMenu: {
          items: {
            custom: {
              name: 'This is very long text which should expand the drop-down menu...'
            },
            filter_by_condition: {},
            filter_operators: {},
            filter_by_condition2: {},
            filter_by_value: {},
            filter_action_bar: {}
          }
        },
        filters: true
      });
      var $menu = $('.htDropdownMenu');
      dropdownMenu(0);
      yield sleep(300);
      var firstWidth = $menu.find('.wtHider').width();
      hot.updateSettings({
        dropdownMenu: true
      });
      dropdownMenu(0);
      yield sleep(300);
      var nextWidth = $menu.find('.wtHider').width();
      expect(nextWidth).toBeLessThan(firstWidth);
    }));
    it('should display proper width of the menu after second render (bug: effect of resizing menu by the 3px) - ' + 'AutoColumnSize counts also border added to drop-down menu',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        colHeaders: true,
        dropdownMenu: true,
        filters: true
      });
      var $menu = $('.htDropdownMenu');
      dropdownMenu(0);
      yield sleep(300);
      var firstWidth = $menu.find('.wtHider').width();
      mouseDown(this.$container);
      dropdownMenu(0);
      yield sleep(300);
      var nextWidth = $menu.find('.wtHider').width();
      expect(nextWidth).toEqual(firstWidth);
    }));
    it('should display proper width of conditional select',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      var hot = handsontable({
        colHeaders: true,
        dropdownMenu: true,
        filters: true,
        language: 'longerForTests'
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      yield sleep(300);
      var $conditionalMenu = $('.htFiltersConditionsMenu');
      var firstWidth = $conditionalMenu.find('.wtHider').width();
      hot.updateSettings({
        language: 'en-US'
      });
      dropdownMenu(0);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      yield sleep(300);
      var nextWidth = $conditionalMenu.find('.wtHider').width();
      expect(nextWidth).toBeLessThan(firstWidth);
    }));
    it('should display proper width of htUIMultipleSelectHot container #151',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        data: [[3, 'D'], [2, 'C'], [1, 'B'], [0, 'A this is very looooong text should expand the drop-down menu'], [3, 'f'], [2, '6'], [1, '!'], [0, 'A this']],
        colHeaders: true,
        rowHeaders: true,
        dropdownMenu: true,
        filters: true
      });
      dropdownMenu(0);
      yield sleep(300);
      var $multipleSelect = $('.htUIMultipleSelectHot');
      var wtHolderWidth = $multipleSelect.find('.wtHolder').width();
      var wtHiderWidth = $multipleSelect.find('.wtHider').width();
      expect(wtHiderWidth).toBeLessThan(wtHolderWidth);
    }));
    it('should not expand the drop-down menu after selecting longer value inside the conditional select',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      handsontable({
        colHeaders: true,
        dropdownMenu: true,
        filters: true,
        language: 'longerForTests'
      });
      var $menu = $('.htDropdownMenu');
      dropdownMenu(0);
      var firstWidth = $menu.find('.wtHider').width();
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      yield sleep(300);
      var $conditionalMenu = $('.htFiltersConditionsMenu');
      var $conditionalMenuItems = $conditionalMenu.find('tbody td:not(.htSeparator)');
      $conditionalMenuItems.eq(1).simulate('mousedown').simulate('mouseup');
      var nextWidth = $menu.find('.wtHider').width();
      expect(nextWidth).toBe(firstWidth);
    }));
  });
});