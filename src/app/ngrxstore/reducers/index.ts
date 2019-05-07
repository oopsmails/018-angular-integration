import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '@environment/environment';
import * as fromExampleCourses from '@example/components/generic/courses/example-courses.reducer';

export interface AppState {

  exampleCourses: fromExampleCourses.ExampleCoursesState;
}

export const reducers: ActionReducerMap<AppState> = {

  exampleCourses: fromExampleCourses.coursesReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
