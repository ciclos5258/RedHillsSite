class Win95Popup {
  /**
   * @param {string} popupSelector – CSS-селектор элемента окна
   * @param {string|null} triggerSelector – селектор кнопки-триггера
   */
  constructor(popupSelector, triggerSelector = null) {
    // Ищем элемент. Если отсутствует – тихо выходим, не ломая страницу.
    const element = document.querySelector(popupSelector);
    if (!element) {
      console.warn('Win95Popup: элемент ' + popupSelector + ' не найден');
      this.popup = null;
      return;
    }

    this.popup = element;
    this.titleBar = this.popup.querySelector('.popup-title-bar');
    this.closeBtn = this.popup.querySelector('.popup-close-btn');
    this.okBtn = this.popup.querySelector('.popup-ok-btn');

    // Безопасно привязываем события
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    if (this.okBtn) {
      this.okBtn.addEventListener('click', () => this.close());
    }
    this._initDrag();

    // Привязываем внешний триггер, если передан
    if (triggerSelector) {
      const trigger = document.querySelector(triggerSelector);
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      }
    }
  }

  open() {
    if (!this.popup) return;
    if (this.popup.style.display === 'block') return;
    this.popup.style.display = 'block';
    this._center();
  }

  close() {
    if (!this.popup) return;
    this.popup.style.display = 'none';
  }

  _center() {
    if (!this.popup) return;
    const w = this.popup.offsetWidth;
    const h = this.popup.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    this.popup.style.left = Math.max(0, (vw - w) / 2) + 'px';
    this.popup.style.top = Math.max(0, (vh - h) / 2) + 'px';
  }

  _initDrag() {
    if (!this.titleBar) return;

    let isDragging = false,
        startX, startY,
        initialLeft, initialTop;

    const onMouseMove = (e) => {
      if (!isDragging || !this.popup) return;
      e.preventDefault();
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      this.popup.style.left = (initialLeft + dx) + 'px';
      this.popup.style.top = (initialTop + dy) + 'px';
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    this.titleBar.addEventListener('mousedown', (e) => {
      if (e.target.closest('.popup-close-btn')) return;
      if (!this.popup) return;
      isDragging = true;
      const rect = this.popup.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      startX = e.clientX;
      startY = e.clientY;
      document.body.style.userSelect = 'none';

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
}

// Инициализация только после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Контакты — присутствует не на всех страницах
  if (document.querySelector('#popupWindow')) {
    new Win95Popup('#popupWindow', '#openPopupLink');
  }

  // Окно «В разработке» — только на news.html
  if (document.querySelector('#work_in_progress_popup')) {
    new Win95Popup('#work_in_progress_popup', '#work_in_progress_link');
  }
});