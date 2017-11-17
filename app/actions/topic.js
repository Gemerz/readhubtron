// @flow
import { push } from 'react-router-redux';
// import type { TopicStateType } from '../reducers/topic';
import { checkHttpStatus, parseJSON } from '../utils';

type actionType = {
  type: string,
  payload: any
};
type TopicStateType = {
  topic: {
    collection: {
      length: number
    }
  }
};

type SettingStateType = {
  setting: {}
};
export const GET_TOPIC_INIT_REQUEST = 'GET_TOPIC_INIT_REQUEST';
export const GET_TOPIC_INIT_SUCCESS = 'GET_TOPIC_INIT_SUCCESS';
export const GET_TOPIC_INIT_FAILURE = 'GET_TOPIC_INIT_FAILURE';

export const GET_TOPIC_MORE_REQUEST = 'GET_TOPIC_MORE_REQUEST';
export const GET_TOPIC_MORE_SUCCESS = 'GET_TOPIC_MORE_SUCCESS';
export const GET_TOPIC_MORE_FAILURE = 'GET_TOPIC_MORE_FAILURE';

export const SET_TOPIC_LAST_CURSOR = 'SET_TOPIC_LAST_CURSOR';
export const SET_TOPIC_CURRENT_URL = 'SET_TOPIC_CURRENT_URL';
export const SET_TOPIC_TOTAL_URL = 'SET_TOPIC_TOTAL_URL';

export const CHECK_TOPIC_LATEST = 'CHECK_TOPIC_LATEST';


export function getTopicRequest() {
  return {
    type: GET_TOPIC_INIT_REQUEST,
    payload: { loading: true }
  };
}
export function getTopicSuccess(collection: any) {
  return {
    type: GET_TOPIC_INIT_SUCCESS,
    payload: { collection, loading: false }
  };
}


export function getTopicMoreRequest() {
  return {
    type: GET_TOPIC_MORE_REQUEST,
    payload: { moreLoading: true }
  };
}
export function getTopicMoreSuccess(collection: any) {
  return {
    type: GET_TOPIC_MORE_SUCCESS,
    payload: { collection, moreLoading: false }
  };
}
export function setTopiclastCursor(lastCursor: number) {
  return {
    type: SET_TOPIC_LAST_CURSOR,
    payload: { lastCursor }
  };
}
export function setTopicCurrentUrl(currentUrl: string) {
  return {
    type: SET_TOPIC_CURRENT_URL,
    payload: { currentUrl }
  };
}
export function setTopicTotalUrls(totalUrls: {}) {
  return {
    type: SET_TOPIC_TOTAL_URL,
    payload: { totalUrls }
  };
}
export function checkTopicLatest(count: number) {
  return {
    type: CHECK_TOPIC_LATEST,
    payload: { count }
  };
}


export function initTopic() {
  return (dispatch: (action: actionType) => void, getState: () => SettingStateType) => {
    const { setting } = getState();

    const API = 'https://api.readhub.me/topic?&pageSize=10';
    dispatch(getTopicRequest());
    fetch(API, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Length': ' application/json'
      }
    }).then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        // dispatch(getTopic(response.data));
        dispatch(getTopicSuccess(response.data));
        if (response.data[0].order) {
          dispatch(setTopiclastCursor(response.data[0].order));
          const url = setting.moblieFirst ? response.data[0].newsArray[0].mobileUrl : response.data[0].newsArray[0].url;
          dispatch(setTopicCurrentUrl(url));
          dispatch(setTopicTotalUrls(response.data[0].newsArray));
        }
      });
  };
}

export function loadMoreTopic() {
  return (dispatch: (action: actionType) => void, getState: () => TopicStateType) => {
    const { topic } = getState();
    const nextPageCursor = topic.collection[topic.collection.length - 1].order;
    const API = `https://api.readhub.me/topic?&pageSize=10&lastCursor=${nextPageCursor}`;
    dispatch(getTopicMoreRequest());
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
          dispatch(getTopicMoreSuccess(response.data));
        });
    }, 500);
  };
}
export function fetchLatestCollection(lastCursor: number) {
  return (dispatch: (action: actionType) => void, getState: () => TopicStateType) => {
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
        dispatch(checkTopicLatest(response.count));
      });
  };
}
