import * as types from './actionTypes';

export function beginAjaxCall(){
  return {type : types.BEGIN_AJAX_CALLS};
}

export function ajaxCallError(){
  return {type : types.AJAX_CALLS_ERROR};
}
