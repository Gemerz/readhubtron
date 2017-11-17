// @flow
import {
  GET_NEWS_INIT_REQUEST,
  GET_NEWS_INIT_SUCCESS,
  GET_NEWS_INIT_FAILURE,
  GET_NEWS_MORE_REQUEST,
  GET_NEWS_MORE_SUCCESS,
  GET_NEWS_MORE_FAILURE,
  SET_NEWS_LAST_CURSOR,
  SET_NEWS_CURRENT_URL,
  CHECK_NEWS_LATEST
} from '../actions/news';

export type NewsStateType = {
  collection: any,
  lastCursor: number,
  loading: boolean,
  currentUrl: string,
  moreLoading: boolean,
  count: number,
  category: string
};

type actionType = {
  type: string,
  payload: any
};
const initialState: NewsStateType = {
  collection: [],
  lastCursor: 0,
  loading: false,
  currentUrl: '',
  moreLoading: false,
  count: 0,
  category: 'news'
};

export default function topic(state: NewsStateType = initialState, action: actionType) {
  switch (action.type) {
    // init list
    case GET_NEWS_INIT_REQUEST:
      return {
        ...state,
        loading: action.payload.loading
      };

    case GET_NEWS_INIT_SUCCESS:
      const Collection = [];
      action.payload.collection.map((item, key) => Collection.push(item));
      return {
        ...state,
        collection: Collection,
        loading: action.payload.loading
      };

    // more list
    case GET_NEWS_MORE_REQUEST:
      return {
        ...state,
        moreLoading: action.payload.moreLoading
      };
    case GET_NEWS_MORE_SUCCESS:
      const MoreCollection = state.collection;
      action.payload.collection.map((item, key) => MoreCollection.push(item));
      return {
        ...state,
        collection: MoreCollection,
        moreLoading: action.payload.moreLoading
      };
    case SET_NEWS_LAST_CURSOR:
      return {
        ...state,
        lastCursor: action.payload.lastCursor,
      };

    case SET_NEWS_CURRENT_URL:
      return {
        ...state,
        currentUrl: action.payload.currentUrl,
      };
    // check lastest
    case CHECK_NEWS_LATEST:
      return {
        ...state,
        count: action.payload.count,
      };
    default:
      return state;
  }
}
