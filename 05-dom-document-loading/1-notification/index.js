export default class NotificationMessage {
    static prevElement;
    #timerId;

    constructor(message, params = { duration: 1000, type: 'success' }) {
      this.message = message;
      this.type = params.type;
      this.duration = params.duration;
      this.time = params.duration / 1000 + 's';

      this.element = this.createElement();
      this.show();
    }

    show(target) {
      if (NotificationMessage.prevElement) {
        NotificationMessage.prevElement.remove();
      }
      
      this.#timerId = setTimeout(() => this.remove(), this.duration);
      if (!target) {target = document.body;}
      target.append(this.element);

      NotificationMessage.prevElement = this;
    }

    remove() {
      this.destroy();
    }

    createElement() {
      const element = document.createElement("div");
      element.innerHTML = this.createTemplate();
      return element.firstElementChild;
    }

    createTemplate() {
      return `
        <div class="notification ${this.type}" style="--value:${this.time}">
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

    destroy() {
      this.element.remove();
      clearTimeout(this.#timerId);
    }
}


