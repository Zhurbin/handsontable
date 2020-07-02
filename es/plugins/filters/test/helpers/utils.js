export function conditionMenuRootElements() {
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
export function conditionSelectRootElements() {
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
export function conditionRadioInput(index) {
  var plugin = hot().getPlugin('filters');
  var root;

  if (plugin && plugin.components.has('filter_operators')) {
    root = plugin.components.get('filter_operators').elements[index];
  }

  return root;
}
export function byValueBoxRootElement() {
  var plugin = hot().getPlugin('filters');
  var root;

  if (plugin) {
    root = byValueMultipleSelect().itemsBox.rootElement;
  }

  return root;
}
export function byValueMultipleSelect() {
  var plugin = hot().getPlugin('filters');
  var root;

  if (plugin && plugin.components.has('filter_by_value')) {
    root = plugin.components.get('filter_by_value').getMultipleSelectElement();
  }

  return root;
}
export function dateRowFactory(meta) {
  var options = {
    meta: meta || {}
  };
  return function (value) {
    options.value = value;
    return options;
  };
}
export function conditionFactory(funcForCall) {
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