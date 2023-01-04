import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  /**
   * render recieved object to the dom
   * @param {Object|Object[]} data data to be rendered for e.g. -> recipe
   * @param {boolean} render(optional) if false create markup string inseted of rendering data to dom
   * @returns {undefined|string}
   * @this { Object} view instance / object
   * @todo finished
   * @author sunny jha
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length == 0))
      return this.renderError();
    this._data = data;
    const markUp = this._generateMarkup();
    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  /**
   *
   * @param {Object|Object[]} data
   * @this {Object}
   * generate markup and newDom pick out newelements and currentelements and compare
   * to just update those value
   * which is change
   * not render all the time -> just update that values
   */
  update(data) {
    // if (!data || (Array.isArray(data) && data.length == 0))
    //   return this.renderError();
    this._data = data;
    const newMarkUp = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(newElements, currElements);
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      // console.log(currEl, newEl.isEqualNode(currEl));
      //update change text
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }
      //update change attributes
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  /**
   * clear the parent element so that when new html load it clear it first
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }
  /**
   * make markup
   * clear first then assign to parentele.
   */
  renderSpinner() {
    const markup = `
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  /**
   *
   * @param {string} msg
   * generate markup clear first then insert
   */
  renderError(msg = this._errorMsg) {
    const markUp = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${msg}</p>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  /**
   *
   * @param {string} msg
   * generate markup clear first then insert
   */
  renderMessage(msg = this._message) {
    const markUp = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${msg}</p>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
