// @flow
import Moment from 'moment';
// import type { TechStateType } from '../reducers/tech';
import { checkHttpStatus, parseJSON } from '../utils';

type actionType = {
  type: string,
  payload: any
};
type TechStateType = {
  tech: {
    collection: {
      length: number
    }
  }
};
export const GET_TECH_INIT_REQUEST = 'GET_TECH_INIT_REQUEST';
export const GET_TECH_INIT_SUCCESS = 'GET_TECH_INIT_SUCCESS';
export const GET_TECH_INIT_FAILURE = 'GET_TECH_INIT_FAILURE';

export const GET_TECH_MORE_REQUEST = 'GET_TECH_MORE_REQUEST';
export const GET_TECH_MORE_SUCCESS = 'GET_TECH_MORE_SUCCESS';
export const GET_TECH_MORE_FAILURE = 'GET_TECH_MORE_FAILURE';

export const SET_TECH_LAST_CURSOR = 'SET_TECH_LAST_CURSOR';
export const SET_TECH_CURRENT_URL = 'SET_TECH_CURRENT_URL';

export const CHECK_TECH_LATEST = 'CHECK_TECH_LATEST';


export function getTechRequest() {
  return {
    type: GET_TECH_INIT_REQUEST,
    payload: { loading: true }
  };
}
export function getTechSuccess(collection: any) {
  return {
    type: GET_TECH_INIT_SUCCESS,
    payload: { collection, loading: false }
  };
}


export function getTechMoreRequest() {
  return {
    type: GET_TECH_MORE_REQUEST,
    payload: { moreLoading: true }
  };
}
export function getTechMoreSuccess(collection: any) {
  return {
    type: GET_TECH_MORE_SUCCESS,
    payload: { collection, moreLoading: false }
  };
}
export function setTechlastCursor(lastCursor: number) {
  return {
    type: SET_TECH_LAST_CURSOR,
    payload: { lastCursor }
  };
}
export function setTechCurrentUrl(currentUrl: string) {
  return {
    type: SET_TECH_CURRENT_URL,
    payload: { currentUrl }
  };
}
export function checkTechLatest(count: number) {
  return {
    type: CHECK_TECH_LATEST,
    payload: { count }
  };
}


export function initTech() {
  return (dispatch: (action: actionType) => void, getState: () => TechStateType) => {
    const API = `https://api.readhub.me/technews?&pageSize=10&lastCursor=${Moment().valueOf()}`;
    dispatch(getTechRequest());
    fetch(API, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Length': ' application/json'
      }
    }).then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        // dispatch(getTech(response.data));
        dispatch(getTechSuccess(response.data));
        if (response.data[0].publishDate) {
          const lastCursor = Moment(response.data[0].publishDate).valueOf();
          dispatch(setTechlastCursor(lastCursor));
          dispatch(setTechCurrentUrl(response.data[0].url));
        }
      });
  };
}

export function loadMoreTech() {
  return (dispatch: (action: actionType) => void, getState: () => TechStateType) => {
    const { tech } = getState();
    const cursor = tech.collection[tech.collection.length - 1].publishDate;
    const nextPageCursor = Moment(cursor).valueOf();
    const API = `https://api.readhub.me/technews?&pageSize=10&lastCursor=${nextPageCursor}`;
    dispatch(getTechMoreRequest());
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
          dispatch(getTechMoreSuccess(response.data));
        });
    }, 500);
  };
}
export function fetchLatestCollection(lastCursor: number) {
  return (dispatch: (action: actionType) => void, getState: () => TechStateType) => {
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
        dispatch(checkTechLatest(response.count));
      });
  };
}

