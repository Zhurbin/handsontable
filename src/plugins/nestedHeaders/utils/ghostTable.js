import { fastInnerHTML } from '../../../helpers/dom/element';
import { clone } from '../../../helpers/object';

class GhostTable {
  constructor(plugin) {
    this.widths = [];
    this.wrapper = void 0;
    this.headersInstance = plugin;
  }

  setWidths() {
    this.wrapper = document.createElement('div');
    this.createGhostTable(this.wrapper);
    this.headersInstance.hot.rootElement.appendChild(this.wrapper);

    const columns = this.wrapper.querySelectorAll('tr:last-of-type th');
    const columnsLength = columns.length;

    for (let i = 0; i < columnsLength; i++) {
      this.widths.push(columns[i].offsetWidth);
    }

    this.wrapper.parentNode.removeChild(this.wrapper);
    this.wrapper = null;
    this.headersInstance.hot.render();
  }

  createGhostTable(container) {
    const d = document;
    const fragment = d.createDocumentFragment();
    const table = d.createElement('table');
    let lastRowColspan = false;
    const maxRows = this.headersInstance.colspanArray.length;
    const maxCols = this.headersInstance.hot.countCols();
    const lastRowIndex = maxRows - 1;

    for (let row = 0; row < maxRows; row++) {
      const tr = d.createElement('tr');

      lastRowColspan = false;

      for (let col = 0; col < maxCols; col++) {
        const td = d.createElement('th');
        const headerObj = clone(this.headersInstance.colspanArray[row][col]);

        if (headerObj && !headerObj.hidden) {
          if (row === lastRowIndex) {
            if (headerObj.colspan > 1) {
              lastRowColspan = true;
            }
          }

          fastInnerHTML(td, headerObj.label);
          td.colSpan = headerObj.colspan;
          tr.appendChild(td);
        }
      }

      table.appendChild(tr);
    }

    if (lastRowColspan) {
      {
        const tr = d.createElement('tr');

        for (let col = 0; col < maxCols; col++) {
          const td = d.createElement('th');
          tr.appendChild(td);
        }

        table.appendChild(tr);
      }
    }

    fragment.appendChild(table);
    container.appendChild(fragment);
  }

  clear() {
    this.wrapper = null;
    this.widths.length = 0;
  }

}

export default GhostTable;
