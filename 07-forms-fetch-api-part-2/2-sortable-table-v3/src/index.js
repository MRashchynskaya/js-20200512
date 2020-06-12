import fetchJson from "./utils/fetch-json.js";

const BACKEND_URL = "https://course-js.javascript.ru";

class SortableTable {
  element;
  subElements = {};
  header = [];
  data = [];
  url = "";
  defaultSort = {};
  query = "";

  constructor(header, { url } = {}) {
    this.header = header;
    this.url = `${BACKEND_URL}/${url}`;
    this.defaultSort = {
      _sort: header.find((item) => item.sortable).id,
      _order: "asc",
      _start: 0,
      _end: 30,
    };
    this.query = `?${new URLSearchParams(this.defaultSort).toString()}`;
    this.getData(this.url, this.query);
    this.render();
  }

  get templateTableContainer() {
    return `
     <div data-element="productsContainer" class="products-list__container">
       <div class="sortable-table">
        ${this.templateTableHeader}
        <div data-element="body" class="sortable-table__body">
          ${this.templateTableContent}
        </div>
        ${this.getLoader()}
        ${this.getEmptyPlaceholder()}
       </div>
     </div>
    `;
  }

  get templateTableHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.header
          .map(({ id, title, sortable }) => {
            const order =
              this.defaultSort._sort === id ? this.defaultSort._order : "desc";
            return `
            <div class="sortable-table__cell" data-name='${id}' data-sortable='${sortable}' data-order='${order}'>
              <span>${title}</span>
              ${this.getHeaderSortArrow(id)}
            </div>
          `;
          })
          .join("")}
      </div>
    `;
  }

  getHeaderSortArrow(id) {
    const isOrderExist =
      this.defaultSort._sort === id ? this.defaultSort._order : "";
    return isOrderExist
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : "";
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

  getLoader() {
    return `
      <div
        data-element='loading'
        class='loading-line sortable-table__loading-line'
      ></div>
    `;
  }

  getEmptyPlaceholder() {
    return `
      <div
        data-element='emptyPlaceholder'
        class='sortable-table__empty-placeholder'
      >No products</div>
    `;
  }

  async getData(url, query) {
    let response = await fetchJson(`${url}${query}`);
    this.data = response;
    this.subElements.body.innerHTML = this.templateTableContent;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.templateTableContainer;
    const element = wrapper.firstElementChild;
    this.element = element;
    this.subElements = this.getSubElements(element);
    this.initEventListeners();
  }

  initEventListeners() {
    this.subElements.header.addEventListener("pointerdown", this.sortOnServer);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll("[data-element]");
    const subElements = {};
    for (let subElement of elements) {
      subElements[subElement.dataset.element] = subElement;
    }
    return subElements;
  }

  sortOnServer = (event) => {
    const targetCell = event.target.closest('[data-sortable="true"]');
    const currentSortParameter =
      targetCell.dataset.order === "asc" ? "desc" : "asc";
    const currentSort = this.defaultSort;
    currentSort._sort = targetCell.dataset.name;
    currentSort._order = currentSortParameter;
    const currentQuery = `?${new URLSearchParams(currentSort).toString()}`;
    // не разобралась как должно работать переключение лоадинга и контента
    this.element.firstElementChild.classList.add("sortable-table_loading");
    this.getData(this.url, currentQuery);
    targetCell.dataset.order = currentSortParameter;
    this.element.firstElementChild.classList.remove("sortable-table_loading");
    const arrow = targetCell.querySelector(".sortable-table__sort-arrow");
    if (!arrow) {
      targetCell.append(this.subElements.arrow);
    }
  };

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

export default SortableTable;
