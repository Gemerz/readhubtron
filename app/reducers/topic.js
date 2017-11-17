// @flow
import {
  GET_TOPIC_INIT_REQUEST,
  GET_TOPIC_INIT_SUCCESS,
  GET_TOPIC_INIT_FAILURE,
  GET_TOPIC_MORE_REQUEST,
  GET_TOPIC_MORE_SUCCESS,
  GET_TOPIC_MORE_FAILURE,
  SET_TOPIC_LAST_CURSOR,
  SET_TOPIC_CURRENT_URL,
  SET_TOPIC_TOTAL_URL,
  CHECK_TOPIC_LATEST
} from '../actions/topic';

export type TopicStateType = {
  collection: any,
  lastCursor: number,
  loading: boolean,
  currentUrl: string,
  moreLoading: boolean,
  count: number,
  category: string,
  totalUrls: {}
};

type actionType = {
  type: string,
  payload: any
};
const initialState: TopicStateType = {
  collection: [],
  lastCursor: 0,
  loading: false,
  currentUrl: '',
  moreLoading: false,
  count: 0,
  category: 'topic',
  totalUrls: {}
};

export default function topic(state: TopicStateType = initialState, action: actionType) {
  const Collection = [];
  const MoreCollection = state.collection;
  switch (action.type) {
    // init list
    case GET_TOPIC_INIT_REQUEST:
      return {
        ...state,
        loading: action.payload.loading
      };
    case GET_TOPIC_INIT_SUCCESS:
      action.payload.collection.map((item) => Collection.push(item));
      return {
        ...state,
        collection: Collection,
        loading: action.payload.loading
      };
    case GET_TOPIC_INIT_FAILURE:
      return {
        ...state
      };
    // more list
    case GET_TOPIC_MORE_REQUEST:
      return {
        ...state,
        moreLoading: action.payload.moreLoading
      };
    case GET_TOPIC_MORE_SUCCESS:
      action.payload.collection.map((item) => MoreCollection.push(item));
      return {
        ...state,
        collection: MoreCollection,
        moreLoading: action.payload.moreLoading
      };
    case GET_TOPIC_MORE_FAILURE:
      return {
        ...state
      };
    case SET_TOPIC_LAST_CURSOR:
      return {
        ...state,
        lastCursor: action.payload.lastCursor,
      };

    case SET_TOPIC_CURRENT_URL:

      return {
        ...state,
        currentUrl: action.payload.currentUrl
      };
    case SET_TOPIC_TOTAL_URL:

      return {
        ...state,
        totalUrls: action.payload.totalUrls
      };
    // check lastest
    case CHECK_TOPIC_LATEST:
      return {
        ...state,
        count: action.payload.count,
      };

    default:
      return state;
  }
}
