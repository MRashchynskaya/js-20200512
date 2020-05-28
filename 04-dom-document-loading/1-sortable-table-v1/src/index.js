let activeTable = null;

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
        ${this.templateTableContent}
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
            </div>
          `;
          })
          .join("")}
      </div>
    `;
  }

  get templateTableContent() {
    return `
      ${this.data
        .map(({ title, price, sales }) => {
          return `
            <div data-element="body" class="sortable-table__body">
              <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
                <div class="sortable-table__cell">
                  <img class="sortable-table-image" alt="Image" src="">
                </div>
                <div class="sortable-table__cell">${title}</div>
                <div class="sortable-table__cell"></div>
                <div class="sortable-table__cell">${price}</div>
                <div class="sortable-table__cell">${sales}</div>
              </a>
            </div>
          `;
        })
        .join("")}
    `;
  }

  render() {
    const node = document.createElement("div");
    node.innerHTML = this.templateTableContainer;
    this.element = node.firstElementChild;
    this.subElements = this.templateTableContent;
    console.log(this.subElements);
  }

  show(el = bodyEl) {
    const bodyElement = el;
    bodyElement.appendChild(this.element);
  }

  sort(fieldValue, orderValue) {
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
    this.remove();
    this.render();
    this.show();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    activeTable = null;
  }
}
