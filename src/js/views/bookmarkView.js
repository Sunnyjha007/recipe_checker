import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './view';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = 'No Bookmark found. Please Bookmark first :)';
  _successMsg = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    //     console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarkView();
