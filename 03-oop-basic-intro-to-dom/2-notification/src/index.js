export default class NotificationMessage {
  constructor(message = "", { duration = 0, type = "" } = {}) {
    this.message = message;
    this.duration = duration / 1000;
    this.timer = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration}s">
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
    const element = document.createElement("div");
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  show() {
    // console.log(window.notification);
    // console.log(this.isNotification);
    const bodyElement = document.querySelector("body");
    bodyElement.appendChild(this.element);
    setTimeout(() => this.remove(), this.timer);
  }

  remove() {
    this.element.remove();
  }

  // destroy() {
  //   this.remove();
  // }
}
