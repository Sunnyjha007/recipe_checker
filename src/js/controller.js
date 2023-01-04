import * as model from './model.js';
import recipeview from './views/recipeview.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODEL_CLOSE_WINDOW } from './config.js';

//parcel hmr->hot module replacement
//if (module.hot) {
//   module.hot.accept();
// }
/**
 *
 * @returns [{promise}]
 * @param {-}
 * @async function
 * @window.location.hash.slice means pick up id from link tab removing #
 * render spinner, get search results according to page 1,2,3,...
 *
 */
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeview.renderSpinner();
    // 0) Update results view to mark selected search result
    resultView.update(model.getSearchResultsPage());
    // 1) Updating bookmarks view
    bookmarkView.update(model.state.bookmarks);
    // 2) Loading recipe
    await model.loadRecipe(id);
    // const recipe = model.state.recipe;
    // 3) Rendering recipe
    recipeview.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeview.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2) load search results
    await model.loadSearchResults(query);
    //3) render that result
    // resultView.render(model.state.search.results); //1 or empty
    resultView.render(model.getSearchResultsPage());
    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  //1 render new result
  resultView.render(model.getSearchResultsPage(goToPage));
  //2 render new  pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //updating the recipe servings (in state)
  model.updateServings(newServings);
  //update the recipe view
  recipeview.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  // console.log(model.state.recipe);
  // 2) Update recipe view
  recipeview.update(model.state.recipe);
  // 3) Render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //render spinner
    addRecipeView.renderSpinner();
    // console.log(newRecipe);
    //upload new recipe to api
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);
    //render recipe
    recipeview.render(model.state.recipe);
    //success msg
    addRecipeView.renderMessage();
    //bookmark render view
    bookmarkView.render(model.state.bookmarks);
    //change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close form bcz if not we can't se that
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_WINDOW);
    // addRecipeView.toggleWindow();
  } catch (err) {
    console.error(err, '😅');
    addRecipeView.renderError(err.message);
  }
};
/**
 * intital function / starting point
 */
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeview.addHandlerRender(controlRecipes);
  recipeview.addHandlerUpdateServings(controlServings);
  recipeview.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
