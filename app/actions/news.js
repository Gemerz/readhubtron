// @flow
import Moment from 'moment';
import { checkHttpStatus, parseJSON } from '../utils';

type actionType = {
  type: string,
  payload: any
};
type NewsStateType = {
  news: {
    collection: {
      length: number
    }
  }
};
export const GET_NEWS_INIT_REQUEST = 'GET_NEWS_INIT_REQUEST';
export const GET_NEWS_INIT_SUCCESS = 'GET_NEWS_INIT_SUCCESS';
export const GET_NEWS_INIT_FAILURE = 'GET_NEWS_INIT_FAILURE';

export const GET_NEWS_MORE_REQUEST = 'GET_NEWS_MORE_REQUEST';
export const GET_NEWS_MORE_SUCCESS = 'GET_NEWS_MORE_SUCCESS';
export const GET_NEWS_MORE_FAILURE = 'GET_NEWS_MORE_FAILURE';

export const SET_NEWS_LAST_CURSOR = 'SET_NEWS_LAST_CURSOR';
export const SET_NEWS_CURRENT_URL = 'SET_NEWS_CURRENT_URL';

export const CHECK_NEWS_LATEST = 'CHECK_NEWS_LATEST';


export function getNewsRequest() {
  return {
    type: GET_NEWS_INIT_REQUEST,
    payload: { loading: true }
  };
}
export function getNewsSuccess(collection: any) {
  return {
    type: GET_NEWS_INIT_SUCCESS,
    payload: { collection, loading: false }
  };
}


export function getNewsMoreRequest() {
  return {
    type: GET_NEWS_MORE_REQUEST,
    payload: { moreLoading: true }
  };
}
export function getNewsMoreSuccess(collection: any) {
  return {
    type: GET_NEWS_MORE_SUCCESS,
    payload: { collection, moreLoading: false }
  };
}
export function setNewslastCursor(lastCursor: number) {
  return {
    type: SET_NEWS_LAST_CURSOR,
    payload: { lastCursor }
  };
}
export function setNewsCurrentUrl(currentUrl: string) {
  return {
    type: SET_NEWS_CURRENT_URL,
    payload: { currentUrl }
  };
}
export function checkNewsLatest(count: number) {
  return {
    type: CHECK_NEWS_LATEST,
    payload: { count }
  };
}


export function initNews() {
  return (dispatch: (action: actionType) => void) => {
    const API = `https://api.readhub.me/news?&pageSize=10&lastCursor=${Moment().valueOf()}`;
    dispatch(getNewsRequest());
    fetch(API, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Length': ' application/json'
      }
    }).then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        // dispatch(getNews(response.data));
        dispatch(getNewsSuccess(response.data));
        if (response.data[0].publishDate) {
          const lastCursor = Moment(response.data[0].publishDate).valueOf();
          dispatch(setNewslastCursor(lastCursor));
          dispatch(setNewsCurrentUrl(response.data[0].url));
        }
        return Promise.resolve(response);
      })
      .catch((e) => {
        console.log('Oops, error', e);
      });
  };
}

export function loadMoreNews() {
  return (dispatch: (action: actionType) => void, getState: () => NewsStateType) => {
    const { news } = getState();
    const cursor = news.collection[news.collection.length - 1].publishDate;
    const nextPageCursor = Moment(cursor).valueOf();
    const API = `https://api.readhub.me/news?&pageSize=10&lastCursor=${nextPageCursor}`;
    dispatch(getNewsMoreRequest());
    setTimeout(() => {
      fetch(API, {
        method: 'get',
        mode: 'cors',
        headers: {
          'Content-Length': ' application/json'
        }
      }).then(checkHttpStatus)
        .then(parseJSON)
        .then(response => {
          dispatch(getNewsMoreSuccess(response.data));
          return Promise.resolve(response);
        })
        .catch((e) => {
          console.log('Oops, error', e);
        });
    }, 500);
  };
}
export function fetchLatestCollection(lastCursor: number) {
  return (dispatch: (action: actionType) => void) => {
    const API = ` https://api.readhub.me/topic/newCount?latestCursor=${lastCursor}`;
    fetch(API, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Length': ' application/json'
      }
    }).then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(checkNewsLatest(response.count));
        return Promise.resolve(response);
      })
      .catch((e) => {
        console.log('Oops, error', e);
      });
  };
}

