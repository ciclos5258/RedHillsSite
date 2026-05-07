class Win95Popup {
  /**
   * @param {string} popupSelector – CSS-селектор элемента окна (например, '#popupWindow')
   * @param {string|null} triggerSelector – селектор кнопки/ссылки, которая открывает окно (можно передать null, если управление будет вручную)
   */
  constructor(popupSelector, triggerSelector = null) {
    this.popup = document.querySelector(popupSelector);
    if (!this.popup) throw new Error(`Popup "${popupSelector}" not found`);

    this.titleBar = this.popup.querySelector('.popup-title-bar');
    this.closeBtn = this.popup.querySelector('.popup-close-btn');
    this.okBtn = this.popup.querySelector('.popup-ok-btn');

    // Привязываем события
    this.closeBtn?.addEventListener('click', () => this.close());
    this.okBtn?.addEventListener('click', () => this.close());
    this._initDrag();

    // Если передан триггер – привязываем открытие
    if (triggerSelector) {
      const trigger = document.querySelector(triggerSelector);
      trigger?.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }
  }

  open() {
    if (this.popup.style.display === 'block') return;
    this.popup.style.display = 'block';
    this._center();
  }

  close() {
    this.popup.style.display = 'none';
  }

  _center() {
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
      if (!isDragging) return;
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

// После загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#popupWindow')) {
    new Win95Popup('#popupWindow', '#openPopupLink');  // Контакты
  }
  
  if (document.querySelector('#work_in_progress_popup')) {
    new Win95Popup('#work_in_progress_popup', '#work_in_progress_link'); // В разработке
  }
});