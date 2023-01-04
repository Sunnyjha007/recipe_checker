import icons from 'url:../../img/icons.svg';
import View from './view';
/**
 * AddRecipeView class extend view
 */
class AddRecipeView extends View {
  //all protected data
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was Successfully Uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  //constructor calling
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  //toogle window and overlay
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  //open add recipe
  _addHandlerShowWindow() {
    //bind is compulsory bcz this id assign to class and to give tooglewindow this we have to use this
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  //close add recipe
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  /**
   *
   * @param {function} handler
   */
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //convert to arr by [... ]
      // formData take all values from a given from
      const dataArr = [...new FormData(this)];
      //convert arr to object data
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}
export default new AddRecipeView();
