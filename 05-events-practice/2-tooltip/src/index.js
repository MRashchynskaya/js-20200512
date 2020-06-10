class Tooltip {
  tooltipElement;
  tooltipTargetElement;
  offsetRight = 5;
  offsetBottom = 5;

  constructor() {
    this.render();
  }

  addTooltip = (event) => {
    if (event.target.dataset.tooltip) {
      this.tooltipTargetElement = event.target;
      this.tooltipElement.textContent = `${event.target.dataset.tooltip}`;
      this.tooltipElement.style.display = "block";
      this.tooltipElement.style.left = event.clientX + this.offsetRight + "px";
      this.tooltipElement.style.top = event.clientY + this.offsetBottom + "px";
      this.tooltipTargetElement.addEventListener(
        "pointerout",
        this.deleteTooltip
      );
      document.addEventListener("pointermove", this.moveTooltip);
    }
  };

  moveTooltip = (event) => {
    this.tooltipElement.style.left = event.clientX + this.offsetRight + "px";
    this.tooltipElement.style.top = event.clientY + this.offsetBottom + "px";
  };

  deleteTooltip = (event) => {
    this.tooltipTargetElement.removeEventListener(
      "pointerout",
      this.deleteTooltip
    );
    document.removeEventListener("pointermove", this.moveTooltip);
    this.tooltipElement.style.display = "none";
  };

  get templateTooltip() {
    return `<div class="tooltip"></div>`;
  }

  render() {
    const node = document.createElement("div");
    node.innerHTML = this.templateTooltip;
    this.tooltipElement = node.firstElementChild;
    this.tooltipElement.style.display = "none";
    document.body.append(this.tooltipElement);
  }

  remove() {
    this.tooltipElement.remove();
  }

  destroy() {
    this.remove();
    document.removeEventListener("pointerover", this.addTooltip);
  }

  initialize() {
    document.addEventListener("pointerover", this.addTooltip);
  }
}

const tooltip = new Tooltip();

export default tooltip;
