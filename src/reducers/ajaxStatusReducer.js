import * as types from '../actions/actionTypes';
import initialState from "./initialState";

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action){
  function actionTypeEndInSuccess(type) {
    return type.substring(type.length-8) == '_SUCCESS';
  }

  if(action.type == types.BEGIN_AJAX_CALLS){
    return state + 1;
  }else if (actionTypeEndInSuccess(action.type)){
    return state-1;
  }
  return state;
}
