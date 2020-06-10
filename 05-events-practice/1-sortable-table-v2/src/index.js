class SortableTable {
  element;
  subElements = {};
  header = [];
  data = [];

  constructor(
    header,
    {
      data,
      sorted = {
        id: header.find((item) => item.sortable).id,
        order: "asc",
      },
    } = {}
  ) {
    this.header = header;
    this.data = data;
    this.defaultSort = sorted;
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
              this.defaultSort.id === id ? this.defaultSort.order : "asc";
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
      this.defaultSort.id === id ? this.defaultSort.order : "";
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

  render() {
    this.sort(this.defaultSort.id, this.defaultSort.order);
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.templateTableContainer;
    const element = wrapper.firstElementChild;
    this.element = element;
    this.subElements = this.getSubElements(element);
    this.initEventListeners();
  }

  initEventListeners() {
    this.subElements.header.addEventListener("pointerdown", this.onSortClick);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll("[data-element]");
    const subElements = {};
    for (let subElement of elements) {
      subElements[subElement.dataset.element] = subElement;
    }
    return subElements;
  }

  //sort on click

  onSortClick = (event) => {
    const targetCell = event.target.closest('[data-sortable="true"]');
    const currentSortParameter =
      targetCell.dataset.order === "asc" ? "desc" : "asc";
    this.sort(targetCell.dataset.name, currentSortParameter);
    targetCell.dataset.order = currentSortParameter;
    this.subElements.body.innerHTML = this.templateTableContent;
    const arrow = targetCell.querySelector(".sortable-table__sort-arrow");
    if (!arrow) {
      targetCell.append(this.subElements.arrow);
    }
  };

  //sort

  sort(fieldValue, orderValue) {
    const currentHeaderItem = this.header.find(
      (item) => item.id === fieldValue
    );
    const currentSortType = currentHeaderItem.sortType;
    //не поняла откуда должен браться этот метод, нужно его самим написать?
    const customOrder = currentHeaderItem.customSorting;
    const sortOrder = orderValue === "asc" ? 1 : -1;
    return this.data.sort((a, b) => {
      switch (currentSortType) {
        case "number":
          return sortOrder * (a[fieldValue] - b[fieldValue]);
        case "string":
          return sortOrder * a[fieldValue].localeCompare(b[fieldValue], "ru");
        case "custom":
          return sortOrder * customOrder(a, b);
        default:
          return sortOrder * (a[fieldValue] - b[fieldValue]);
      }
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

export default SortableTable;
