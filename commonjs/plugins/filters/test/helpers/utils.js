"use strict";

exports.__esModule = true;
exports.conditionMenuRootElements = conditionMenuRootElements;
exports.conditionSelectRootElements = conditionSelectRootElements;
exports.conditionRadioInput = conditionRadioInput;
exports.byValueBoxRootElement = byValueBoxRootElement;
exports.byValueMultipleSelect = byValueMultipleSelect;
exports.dateRowFactory = dateRowFactory;
exports.conditionFactory = conditionFactory;

function conditionMenuRootElements() {
  var plugin = hot().getPlugin('filters');
  var root = {
    first: null,
    second: null
  };

  if (plugin) {
    if (plugin.components.has('filter_by_condition')) {
      root.first = plugin.components.get('filter_by_condition').getSelectElement().menu.container;
    }

    if (plugin.components.has('filter_by_condition2')) {
      root.second = plugin.components.get('filter_by_condition2').getSelectElement().menu.container;
    }
  }

  return root;
}

function conditionSelectRootElements() {
  var plugin = hot().getPlugin('filters');
  var root = {
    first: null,
    second: null
  };

  if (plugin) {
    if (plugin.components.has('filter_by_condition')) {
      root.first = plugin.components.get('filter_by_condition').getSelectElement().element;
    }

    if (plugin.components.has('filter_by_condition2')) {
      root.second = plugin.components.get('filter_by_condition2').getSelectElement().element;
    }
  }

  return root;
}

function conditionRadioInput(index) {
  var plugin = hot().getPlugin('filters');
  var root;

  if (plugin && plugin.components.has('filter_operators')) {
    root = plugin.components.get('filter_operators').elements[index];
  }

  return root;
}

function byValueBoxRootElement() {
  var plugin = hot().getPlugin('filters');
  var root;

  if (plugin) {
    root = byValueMultipleSelect().itemsBox.rootElement;
  }

  return root;
}

function byValueMultipleSelect() {
  var plugin = hot().getPlugin('filters');
  var root;

  if (plugin && plugin.components.has('filter_by_value')) {
    root = plugin.components.get('filter_by_value').getMultipleSelectElement();
  }

  return root;
}

function dateRowFactory(meta) {
  var options = {
    meta: meta || {}
  };
  return function (value) {
    options.value = value;
    return options;
  };
}

function conditionFactory(funcForCall) {
  return function () {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return {
      args: args,
      func: function func(dataRow) {
        return funcForCall.apply(dataRow.meta.instance, [].concat([dataRow], [args]));
      }
    };
  };
}