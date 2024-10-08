export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.isSorting = false;
    this.sortField = '';
    this.sortFunction = '';
    this.subElements = {};

    this.element = this.createElement();
    this.selectSubElements();
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  createElement() {
    const div = document.createElement("div");
    div.innerHTML = this.createTemplate();
    return div.firstElementChild;
  }

  createHeader() {
    return `
    <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headerConfig.map(cellData => {
    const { id, title, sortable } = cellData;

    return `
          <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${sortable && id === this.sortField ? this.sortFunction : ''}">
            <span>${title}</span>
            ${this.createArrowElement()}
            
          </div>
        `;
  }).join('')}
    </div>`;
  }

  createArrowElement() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;
  }

  createImg(images = []) {
    if (images.length) {
      return `
         <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src="${images[0]?.url || 'https://via.placeholder.com/32'}">
          </div>
      `;
    }
    return '';
  }

  createDataRow(value) {
    const { id } = value;
    return `
    <a href="/products/${id}" class="sortable-table__row">
        ${this.headerConfig.map(({ id, template }) => this.createDataCell(value[id], template)).join('')}
    </a>
    `;
  }

  createDataCell(value, template) {
    if (template) { return template(value); }
    return `<div class="sortable-table__cell">${value}</div>`;
  }

  createDataList() {
    return this.data.map((value) => this.createDataRow(value)).join('');
  }

  createEmptyPlaceholder() {
    return `
     <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
        <div>
          <p>No products satisfies your filter criteria</p>
          <button type="button" class="button-primary-outline">Reset all filters</button>
        </div>
      </div>
    `;
  }

  createLoader() {
    return `<div data-element="loading" class="loading-line sortable-table__loading-line"></div>`;
  }

  createTemplate() {
    const template = `
    <div class="sortable-table">
      ${this.createHeader()}
      <div data-element="body" class="sortable-table__body">
        ${this.createDataList()}
      </div>

      ${this.createLoader()}

      ${this.createEmptyPlaceholder()}

    </div>
    `;

    return template;
  }

  updateHeader() {
    this.subElements.header.outerHTML = this.createHeader();
  }

  updateTableData() {
    this.subElements.body.innerHTML = this.createDataList();
  }

  sortStrings(arr, param = 'asc') {
    const localeCaseComparator = (a, b) => {
      return a.localeCompare(b, 'ru', { caseFirst: "upper" });
    };

    const sortDesc = (a, b) => localeCaseComparator(b, a);
    const sortAsc = (a, b) => localeCaseComparator(a, b);

    return [...arr].sort(param == "desc" ? sortDesc : sortAsc);
  }

  localeCaseComparator = (a, b) => {
    return a.localeCompare(b, 'ru', { caseFirst: "upper" });
  };

  getSortFunction(sortType, order) {
    const orderMultiplier = order === 'asc' ? 1 : -1;

    switch (sortType) {
    case 'number':
      return (a, b) => (a[this.sortField] - b[this.sortField]) * orderMultiplier;
    case 'string':
      return (a, b) => a[this.sortField].localeCompare(b[this.sortField], 'ru', { caseFirst: 'upper' }) * orderMultiplier;
    default:
      return () => 0;
    }
  }

  sortData() {
    const headerIndex = this.headerConfig.findIndex(obj => obj.id === this.sortField);
    const sortType = this.headerConfig[headerIndex]?.sortType;

    this.data.sort(this.getSortFunction(sortType, this.sortFunction));
  }

  sort(field, sortFunction) {
    this.isSorting = true;
    this.sortField = field;
    this.sortFunction = sortFunction;
    this.updateHeader();
    this.sortData();

    this.updateTableData();
  }

  destroy() {
    this.element.remove();
    this.subElements = {};
  }
}