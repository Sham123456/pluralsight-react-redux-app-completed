import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from "./CourseForm";

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving : false
    };
    this.saveCourse = this.saveCourse.bind(this);
    this.updateCourseState = this.updateCourseState.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.course.id != nextProps.course.id){
      this.setState({course : Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({},this.state.course);
    course[field] = event.target.value;
    return this.setState({course : course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving : true});
    this.props.actions.saveCourse(this.state.course).then(() => this.redirect()
    );
  }

  redirect (){
    this.setState({saving : false});
    this.context.router.push('/courses');
  }

  render() {
    return (
        <CourseForm
          course={this.state.course}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          errors={this.state.errors}
          allAuthors={this.props.authors}
          saving = {this.state.saving}
        />
    );
  }
}

function getCourseById(courses, courseId) {
  const course = courses.filter(course => course.id === courseId);
  if(course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id;
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return{
      value : author.id,
      text : author.firstName + ' '+author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

ManageCoursePage.propTypes = {
  course : PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router : PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
