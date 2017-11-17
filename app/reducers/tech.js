// @flow
import {
  GET_TECH_INIT_REQUEST,
  GET_TECH_INIT_SUCCESS,
  GET_TECH_INIT_FAILURE,
  GET_TECH_MORE_REQUEST,
  GET_TECH_MORE_SUCCESS,
  GET_TECH_MORE_FAILURE,
  SET_TECH_LAST_CURSOR,
  SET_TECH_CURRENT_URL,
  CHECK_TECH_LATEST
} from '../actions/tech';

export type TechStateType = {
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
const initialState: TechStateType = {
  collection: [],
  lastCursor: 0,
  loading: false,
  currentUrl: '',
  moreLoading: false,
  count: 0,
  category: 'tech'
};

export default function tech(state: TechStateType = initialState, action: actionType) {
  switch (action.type) {
    // init list
    case GET_TECH_INIT_REQUEST:
      return {
        ...state,
        loading: action.payload.loading
      };

    case GET_TECH_INIT_SUCCESS:
      const Collection = [];
      action.payload.collection.map((item, key) => Collection.push(item));
      return {
        ...state,
        collection: Collection,
        loading: action.payload.loading
      };

    // more list
    case GET_TECH_MORE_REQUEST:
      return {
        ...state,
        moreLoading: action.payload.moreLoading
      };
    case GET_TECH_MORE_SUCCESS:
      const MoreCollection = state.collection;
      action.payload.collection.map((item, key) => MoreCollection.push(item));
      return {
        ...state,
        collection: MoreCollection,
        moreLoading: action.payload.moreLoading
      };
    case SET_TECH_LAST_CURSOR:
      return {
        ...state,
        lastCursor: action.payload.lastCursor,
      };

    case SET_TECH_CURRENT_URL:
      return {
        ...state,
        currentUrl: action.payload.currentUrl,
      };
    // check lastest
    case CHECK_TECH_LATEST:
      return {
        ...state,
        count: action.payload.count,
      };
    default:
      return state;
  }
}
