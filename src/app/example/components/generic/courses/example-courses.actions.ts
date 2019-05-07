import { Action } from '@ngrx/store';
import { Course } from '@app/shared/model';
import {Update} from '@ngrx/entity';

// export enum ExampleCoursesActionTypes {
//   COURSE_CREATE = '[Example Courses Component] CreateCourse',
//   COURSE_CREATE_SUCCESS = '[Example Courses Component] CreateCourse',
//   COURSE_CREATE_FAIL = '[Example Courses Component] CreateCourse',
//   COURSE_DELETE = '[Example Courses Component] DeleteCourse',
// }

// export class CreateCourse implements Action {
//   readonly type = ExampleCoursesActionTypes.COURSE_CREATE;
//   constructor(public payload: Course) {}
// }

// export class DeleteCourse implements Action {
//   readonly type = ExampleCoursesActionTypes.COURSE_DELETE;
//   constructor(public courseId: string) {}
// }

// export type ExampleCoursesActions = CreateCourse | DeleteCourse;


export enum ExampleCoursesActionTypes {
  CourseRequested = '[View Course Page] Course Requested',
  CourseLoaded = '[Courses API] Course Loaded',
  AllCoursesRequested = '[Courses Home Page] All Courses Requested',
  AllCoursesLoaded = '[Courses API] All Courses Loaded',
  CourseSaved = '[Edit Course Dialog] Course Saved',
  LessonsPageRequested = '[Course Landing Page] Lessons Page Requested',
  LessonsPageLoaded = '[Courses API] Lessons Page Loaded',
  LessonsPageCancelled = '[Courses API] Lessons Page Cancelled'
}

export interface PageQuery {
  pageIndex: number;
  pageSize:number;
}

export class LessonsPageRequested implements Action {

  readonly type = ExampleCoursesActionTypes.LessonsPageRequested;

  constructor(public payload: {courseId:number, page:PageQuery}) {}

}

// export class LessonsPageLoaded implements Action {

//   readonly type = ExampleCoursesActionTypes.LessonsPageLoaded;

//   constructor(public payload:{lessons: Lesson[]}) {}

// }

export class LessonsPageCancelled implements Action {

  readonly type = ExampleCoursesActionTypes.LessonsPageCancelled;

}


export class CourseRequested implements Action {

  readonly type = ExampleCoursesActionTypes.CourseRequested;

  constructor(public payload: { courseId: string }) {

  }
}


export class CourseLoaded implements Action {

  readonly type = ExampleCoursesActionTypes.CourseLoaded;

  constructor(public payload: { course: Course }) {
  }
}


export class AllCoursesRequested implements Action {

  readonly type = ExampleCoursesActionTypes.AllCoursesRequested;

}

export class AllCoursesLoaded implements Action {

  readonly type = ExampleCoursesActionTypes.AllCoursesLoaded;

  constructor(public payload: { courses: Course[] }) {

  }

}

export class CourseSaved implements Action {

  readonly type = ExampleCoursesActionTypes.CourseSaved;

  constructor(public payload: { course: Update<Course> }) {}
}




export type ExampleCoursesActions =
  CourseRequested
  | CourseLoaded
  | AllCoursesRequested
  | AllCoursesLoaded
  | CourseSaved
  | LessonsPageRequested
  // | LessonsPageLoaded
  | LessonsPageCancelled;


