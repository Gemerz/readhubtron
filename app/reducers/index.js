// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import setting from './setting';
import topic from './topic';
import news from './news';
import tech from './tech';

const rootReducer = combineReducers({
  router,
  topic,
  news,
  tech,
  setting,
});

export default rootReducer;
