export default class FilterWidget {
  constructor(element, filterHandler) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    this._filterHandler = filterHandler;

    this.onFilter = this.onFilter.bind(this);

    this._element = element;
    this._filterText = this._element.querySelector('.filter-text');
    this._filterText.addEventListener('input', this.onFilter);
  }

  onFilter(evt) {
    evt.preventDefault();

    if (this._timeout) {
      clearInterval(this._timeout);
    }
    const text = this._filterText.value;
    this._timeout = setTimeout(() => this._filterHandler(text), 300);
  }
}
