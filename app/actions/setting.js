// @flow

export const SET_SIMPLE_LIST_MODE = 'setting/SET_SIMPLE_LIST_MODE';
export const SET_MOBILE_URL_MODE = 'setting/SET_MOBILE_URL_MODE';
export const SET_NOTIFACATION = 'setting/SET_NOTIFACATION';
export const SET_NIGNTVIEW_MODE = 'setting/SET_NIGNTVIEW_MODE';
export const SET_DISABLED_JAVASCRIPT = 'setting/SET_DISABLED_JAVASCRIPT';


export function switchSimpleMode(simpleMode: boolean) {
  return {
    type: SET_SIMPLE_LIST_MODE,
    payload: { simpleMode }
  };
}
export function switchMoblieFirstMode(moblieFirst: boolean) {
  return {
    type: SET_MOBILE_URL_MODE,
    payload: { moblieFirst }
  };
}
export function switchNotificationMode(notificationMode: boolean) {
  return {
    type: SET_NOTIFACATION,
    payload: { notificationMode }
  };
}
export function switchNightViwMode(nightViwMode: boolean) {
  return {
    type: SET_NIGNTVIEW_MODE,
    payload: { nightViwMode }
  };
}
export function switchDisabledJavascript(disabledJavascript: boolean) {
  return {
    type: SET_DISABLED_JAVASCRIPT,
    payload: { disabledJavascript }
  };
}
// export function setSimpleMode(simpleMode: boolean) {
//   return (dispatch: (action: actionType) => void, getState: () => SettingStateType) => {
//     const { setting } = getState();
//     dispatch(switchSimpleMode(simpleMode))
//   };
// }
