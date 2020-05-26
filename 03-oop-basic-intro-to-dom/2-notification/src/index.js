let isElementExist = false;

export default class NotificationMessage {
  constructor(message = "", { duration = 0, type = "" }) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.render();
  }

  get durationInSeconds() {
    return this.duration / 1000;
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.durationInSeconds}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (isElementExist) return;
    isElementExist = true;
    const element = document.createElement("div");
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  show() {
    const bodyElement = document.querySelector("body");
    bodyElement.appendChild(this.element);
    setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    this.element.remove();
    isElementExist = false;
  }

  destroy() {
    this.remove();
    isElementExist = false;
  }
}
