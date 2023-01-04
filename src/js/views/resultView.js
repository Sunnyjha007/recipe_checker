import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './view';
/**
 * @class Resultview which extends property of view
 * @protected members are parent element,errormsg, successmsg
 * @function markup generator
 */
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No recipes found for your query ! Please try again );';
  _successMsg = '';
  _generateMarkup() {
    //     console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultView();
