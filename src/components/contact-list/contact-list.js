import './contact-list.css';
import data from './contact-list.json';
import { containsPhone, containsText, filterBy } from '../../js/filter';

function renderItem(contact) {
  return `
    <li class="contact-list-item">
      <div class="contact-main">
        <img src="https://raw.githubusercontent.com/pixelastic/fakeusers/master/pictures/${contact.picture}" class="contact-list-item-img" alt="">
        <span class="contact-list-item-name">${`${contact.first_name} ${contact.last_name}`}</span>
        <span class="contact-list-item-phone">${contact.phone_number}</span>
        <a href="tel:${contact.phone_number}" class="contact-list-item-action">Звонок</a>
      </div>
      <div class="contact-list-item-details hidden">Подробная информация о клиенте</div>
    </li>
  `;
}

// Вариант через bind из лекции
const filterCb = (search, contact) => containsPhone(contact.phone_number, search)
  || containsText(`${contact.first_name} ${contact.last_name}`, search);

// Вариант через замыкание
// const filterCb = (search) => {
//   return function(contact) {
//     return containsPhone(contact.phone_number, search) ||
//           containsText(contact.first_name + ' ' + contact.last_name, search)
//   }
// }

export default class ContactList {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    this.filter = this.filter.bind(this);
    this._element = element;
    this._users = data;
  }

  _clear() {
    const items = this._element.querySelectorAll('.contact-list-item');
    for (const child of items) {
      child.remove();
    }

    // Array.from(this._element.children).forEach(child => child.remove())
  }

  _renderItems(items) {
    this._clear();
    items.forEach((user) => {
      const itemHtml = renderItem(user);
      this._element.insertAdjacentHTML('beforeend', itemHtml);
    });
  }

  renderUsers() {
    this._renderItems(this._users);
  }

  filter(text) {
    // const filterCallback = filterCb(text) //вариант через замыкание
    const filterCallback = filterCb.bind(null, text); // вариант через bind, заготовка сверху
    this._renderItems(filterBy(this._users, filterCallback));
  }
}
