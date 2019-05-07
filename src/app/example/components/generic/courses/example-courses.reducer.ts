import { Course } from '@app/shared/model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ExampleCoursesActions, ExampleCoursesActionTypes } from './example-courses.actions';

export interface ExampleCoursesState extends EntityState<Course> {
  // allCourses: Course[]
  // selectedCourse: Course
  allCoursesLoaded: boolean;
}

// export const adapter : EntityAdapter<Course> = createEntityAdapter<Course>();
export const adapter : EntityAdapter<Course> = 
      createEntityAdapter<Course>({
        sortComparer: sortByCourseId,
        selectId: course => course.courseId
    });

// export const initialState: ExampleCoursesState = {
//   allCourses: [],
//   selectedCourse: undefined
// };

export const initialCoursesState: ExampleCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});


function sortByCourseId(e1: Course, e2: Course) {
  return Number(e1.courseId) - Number(e2.courseId);
}

// export function reducer(state = initialState, action: ExampleCoursesActions): ExampleCoursesState {
  // switch (action.type) {
  //   case ExampleCoursesActionTypes.COURSE_CREATE: {
  //     return {
  //       ...state,
  //       allCourses: [...state.allCourses, action.payload],
  //       selectedCourse: action.payload
  //     };
  //   }
  //   case ExampleCoursesActionTypes.COURSE_DELETE: {
  //     return {
  //       ...state,
  //       // selectedUser: action.courseId
  //     };
  //   }
  //   default:
  //     return state;
  // }
// }

export function coursesReducer(state = initialCoursesState , action: ExampleCoursesActions): ExampleCoursesState {

  switch(action.type) {

    case ExampleCoursesActionTypes.CourseLoaded:

      return adapter.addOne(action.payload.course, state);

    case ExampleCoursesActionTypes.AllCoursesLoaded:

      return adapter.addAll(action.payload.courses, {...state, allCoursesLoaded:true});

    case ExampleCoursesActionTypes.CourseSaved:

      return adapter.updateOne(action.payload.course,state);

    default: {

      return state;
    }

  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = adapter.getSelectors();

