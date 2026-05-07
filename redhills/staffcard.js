/**
 * ==========================================
 * ООП-подход к управлению карточками сотрудников
 * ==========================================
 */

// 1. Базовый класс Employee
class Employee {
  /**
   * @param {Object} data
   * @param {string} data.firstName - Имя
   * @param {string} data.lastName  - Фамилия
   * @param {string} data.title     - Должность
   * @param {string} data.lab       - Лаборатория / отдел
   */
  constructor({ firstName, lastName, title, lab }) {
    this.firstName = firstName;
    this.lastName  = lastName;
    this.title     = title;
    this.lab       = lab;
  }

  /** Инициалы для аватарки (первые буквы имени и фамилии) */
  get initials() {
    return (this.firstName[0] + this.lastName[0]).toUpperCase();
  }

  /** Полное имя в формате «Фамилия Имя» */
  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  }

  /** Генерирует HTML-разметку карточки */
  renderCard() {
    return `
      <div class="staff-card">
        <div class="staff-photo">
          <span class="initials">${this.initials}</span>
        </div>
        <div class="staff-name">${this.fullName}</div>
        <hr class="staff-divider">
        <div class="staff-title">${this.title}</div>
        <div class="staff-lab">${this.lab}</div>
      </div>
    `;
  }
}

// 2. Наследник для вакантных должностей
class Vacancy extends Employee {
  constructor({ title, lab }) {
    // Родительский конструктор с плейсхолдерами
    super({ firstName: '?', lastName: '?', title, lab });
  }

  get initials() {
    return '??';
  }

  get fullName() {
    return 'Открытая вакансия';
  }

  /** Переопределяем карточку с дополнительным классом .vacancy */
  renderCard() {
    return `
      <div class="staff-card vacancy">
        <div class="staff-photo">
          <span class="initials">${this.initials}</span>
        </div>
        <div class="staff-name">${this.fullName}</div>
        <hr class="staff-divider">
        <div class="staff-title">${this.title}</div>
        <div class="staff-lab">${this.lab}</div>
      </div>
    `;
  }
}

const staffMembers = [
    // Администрация
  new Employee({ firstName: 'Александр',lastName: 'Сомов',     title: 'Главный менеджер',                 lab: 'Администрация'   }),
  new Employee({ firstName: 'Оливия',   lastName: 'Браун',     title: 'Офис-менеджер',                    lab: 'Администрация'   }),
  new Employee({firstName: 'Дмитрий', lastName: 'Безвидосов', title: 'Технический директор',              lab: 'Администрация'   }),

  // Лаборатория №1 — Робототехника и моделирование
  new Employee({ firstName: 'Майкл',    lastName: 'Джонсон',   title: 'Инженер-робототехник',             lab: 'Лаборатория №1' }),
  new Employee({ firstName: 'Ханс',     lastName: 'Мюллер',    title: 'Специалист по компьютерному моделированию', lab: 'Лаборатория №1' }),
  new Employee({ firstName: 'Юки',      lastName: 'Танака',    title: 'Младший научный сотрудник',         lab: 'Лаборатория №1' }),

  // Лаборатория №2 — Машинное обучение
  new Employee({ firstName: 'Светлана', lastName: 'Чен',       title: 'Ведущий инженер-исследователь',    lab: 'Лаборатория №2' }),
  new Employee({ firstName: 'Эмили',    lastName: 'Дэвис',     title: 'Инженер машинного обучения',        lab: 'Лаборатория №2' }),
  new Employee({ firstName: 'Радж',     lastName: 'Патель',    title: 'Научный сотрудник',                 lab: 'Лаборатория №2' }),

  // Лаборатория №3 — Разработка сопроводительного ПО и калибровка систем
  new Employee({ firstName: 'Екатерина',lastName: 'Волкова',   title: 'Программист-разработчик',          lab: 'Лаборатория №3' }),
  new Employee({ firstName: 'Павел',    lastName: 'Романов',   title: 'Аналитик данных',                  lab: 'Лаборатория №3' }),
  new Employee({ firstName: 'Джон',     lastName: 'Смит',      title: 'Инженер по калибровке систем',     lab: 'Лаборатория №3' }),
  new Employee({ firstName: 'Лин',      lastName: 'Ван',       title: 'Тестировщик ПО',                   lab: 'Лаборатория №3' })

];

// 4. Функция рендеринга всех карточек в контейнер
function renderStaffGrid() {
  const grid = document.querySelector('.staff-grid');
  if (!grid) return;

  // Собираем HTML всех карточек через метод renderCard
  grid.innerHTML = staffMembers.map(member => member.renderCard()).join('');
}

// Запускаем после полной загрузки DOM
document.addEventListener('DOMContentLoaded', renderStaffGrid);