import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer, compose(autoRehydrate()));

  persistStore(store, { blacklist: ['topic', 'router', 'news', 'tech'] }, () => {
    console.log('rehydration complete');
    store.getState();
  });
  return store;
}

export default { configureStore, history };
