import courseApi from '../api/mockCourseApi';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";

export function loadCoursesSuccess(courses) {
  return {type: 'LOAD_COURSES_SUCCESS', courses};
}

export function createCoursesSuccess(course) {
  return {type: 'CREATE_COURSE_SUCCESS', course};
}

export function updateCoursesSuccess(course) {
  return {type: 'UPDATE_COURSE_SUCCESS', course};
}


export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCoursesSuccess(savedCourse)) :
        dispatch(createCoursesSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}
