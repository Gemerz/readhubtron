// @flow
import { REHYDRATE } from 'redux-persist/constants';
import Log from 'electron-log';
import {
  SET_SIMPLE_LIST_MODE,
  SET_MOBILE_URL_MODE,
  SET_NOTIFACATION,
  SET_NIGNTVIEW_MODE,
  SET_DISABLED_JAVASCRIPT
} from '../actions/setting.js';


const localstorage = window.localStorage.getItem('reduxPersist:setting');

const localStore = JSON.parse(localstorage);

if (!localStore) {
  Log.warn('dont have localstore');
}

export type SettingStateType = {
  simpleMode: boolean,
  moblieFirst: boolean,
  notificationMode: boolean,
  nightViwMode: boolean,
  disabledJavascript: boolean
};

type actionType = {
  type: string,
  payload: any
};

const initSimpleMode = localStore ? localStore.simpleMode : false;
const initMoblieFirst = localStore ? localStore.moblieFirst : false;
const initNotificationMode = localStore ? localStore.notificationMode : false;
const initNightViwMode = localStore ? localStore.nightViwMode : false;
const initDisabledJavascript = localStore ? localStore.disabledJavascript : true;

const initialState: SettingStateType = {
  simpleMode: initSimpleMode,
  moblieFirst: initMoblieFirst,
  notificationMode: initNotificationMode,
  nightViwMode: initNightViwMode,
  disabledJavascript: initDisabledJavascript
};


export default function topic(state: SettingStateType = initialState, action: actionType) {
  switch (action.type) {
    // init list
    case SET_SIMPLE_LIST_MODE:
      return {
        ...state,
        simpleMode: action.payload.simpleMode
      };
    case SET_MOBILE_URL_MODE:
      return {
        ...state,
        moblieFirst: action.payload.moblieFirst
      };
    case SET_NOTIFACATION:
      return {
        ...state,
        notificationMode: action.payload.notificationMode
      };
    case SET_NIGNTVIEW_MODE:
      return {
        ...state,
        nightViwMode: action.payload.nightViwMode
      };
    case SET_DISABLED_JAVASCRIPT:
      return {
        ...state,
        disabledJavascript: action.payload.disabledJavascript
      };
    case REHYDRATE:
      var incoming = action.payload.myReducer;
      // if (incoming) return { ...state, ...incoming, specialKey: processSpecial(incoming.specialKey) };
      return { ...state, ...incoming };
    default:
      return state;
  }
}
