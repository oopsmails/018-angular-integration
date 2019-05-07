// import { ExampleCoursesState } from './example-courses.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromExampleCourses from './example-courses.reducer';


export const selectCoursesState = createFeatureSelector<fromExampleCourses.ExampleCoursesState>("courses");


// export const selectCourseById = (courseId:number) => createSelector(
//   selectCoursesState,
//   coursesState => coursesState.entities[courseId]
// );


export const selectAllCourses = createSelector(
  selectCoursesState,
  fromExampleCourses.selectAll
);

// export const selectBeginnerCourses = createSelector(
//     selectAllCourses,
//     courses => courses.filter(course => course.category === 'BEGINNER')
// );

// export const selectPromoTotal = createSelector(
//   selectAllCourses,
//     courses => courses.filter(course => course.promo).length
// );


export const allCoursesLoaded = createSelector(
  selectCoursesState,
  coursesState => coursesState.allCoursesLoaded
);



