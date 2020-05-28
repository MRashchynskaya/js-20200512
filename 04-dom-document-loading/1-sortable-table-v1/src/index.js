const bodyEl = document.querySelector("body");
export default class SortableTable {
  constructor(header, { data } = {}) {
    this.header = header;
    this.data = data;
    this.render();
    this.show();
  }

  get templateTableContainer() {
    return `
     <div data-element="productsContainer" class="products-list__container">
       <div class="sortable-table">
        ${this.templateTableHeader}
        <div data-element="body" class="sortable-table__body">
        ${this.templateTableContent}
        </div>
       </div>
     </div>
    `;
  }

  get templateTableHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.header
          .map(({ id, title, sortable }) => {
            return `
            <div class="sortable-table__cell" data-name='${id}' data-sortable='${sortable}'>
              <span>${title}</span>
              <span class="sortable-table__sort-arrow">
                  <span class="sort-arrow"></span>
              </span>
            </div>
          `;
          })
          .join("")}
      </div>
    `;
  }

  get templateTableContent() {
    return this.data
      .map((dataItem) => {
        let tableRow = this.header
          .map((headerItem) => {
            return headerItem.template
              ? headerItem.template(dataItem[headerItem.id])
              : `<div class="sortable-table__cell">${
                  dataItem[headerItem.id]
                }</div>`;
          })
          .join("");
        return `<a href="/products/${dataItem.id}" class="sortable-table__row">
          ${tableRow}
          </a>
        `;
      })
      .join("");
  }

  render() {
    const node = document.createElement("div");
    node.innerHTML = this.templateTableContainer;
    this.element = node.firstElementChild;
    this.subElements = {};
    this.subElements.body = document.createElement("div");
    this.subElements.body.innerHTML = this.templateTableContent;
  }

  show(el = bodyEl) {
    const bodyElement = el;
    bodyElement.appendChild(this.element);
  }

  sort(fieldValue, orderValue) {
    this.remove();
    const currentSortType = this.header.find((item) => item.id === fieldValue)
      .sortType;
    if (currentSortType === "number") {
      this.data.sort((a, b) => {
        if (orderValue === "asc") {
          return a[fieldValue] > b[fieldValue] ? 1 : -1;
        } else {
          return a[fieldValue] > b[fieldValue] ? -1 : 1;
        }
      });
    } else {
      this.data.sort((a, b) => {
        if (orderValue === "asc") {
          return a[fieldValue].localeCompare(b[fieldValue]);
        } else {
          return b[fieldValue].localeCompare(a[fieldValue]);
        }
      });
    }
    this.render();
    this.show();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
