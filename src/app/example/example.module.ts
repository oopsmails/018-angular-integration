import { CourseEffects } from './components/generic/courses/example-courses.effects';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { CardComponent } from '@app/example/components/card-hosting/card.component';
import { SpringCloudLoginComponent } from '@app/example/components/generic/login/spring-cloud/spring-cloud-login.component';
import { SpringCloudLoginService } from '@app/example/components/generic/login/spring-cloud/spring-cloud-login.service';
import { SharedModule } from '@app/shared/shared.module';

import {
  BloggerComponent,
  PageThreeWaysComponent,
  Posts1Component,
  Posts2Component,
  Posts3Component,
} from './components/blogger';
import { CardHostingComponent } from './components/card-hosting/card-hosting.component';
import { ConsumingHttpComponent } from './components/consuming-http/consuming-http.component';
import { PostsService } from './components/consuming-http/posts.service';
import { ExampleHomeComponent } from './components/example-home/example-home.component';
import { CoursesComponent } from './components/generic/courses/courses.component';
import { CoursesService } from './components/generic/courses/courses.service';
import { EmployeeListComponent } from './components/generic/employee/employee-list/employee-list.component';
import { EmployeeService } from './components/generic/employee/employee.service';
import { OauthTokenComponent } from './components/generic/employee/oauth-token/oauth-token.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { Pagination2Component } from './components/pagination/pagination2.component';
import { RxjsHomeComponent } from './components/rxjs-home/rxjs-home.component';
import { JokeListParentComponent } from './components/view-child/joke-list-parent/joke-list-parent.component';
import { JokeListComponent } from './components/view-child/joke-list/joke-list.component';
import { JokeComponent } from './components/view-child/joke/joke.component';
import { CoursesSelectionComponent } from './components/generic/courses/courses-selection/courses-selection.component';
import { CoursesListComponent } from './components/generic/courses/courses-list/courses-list.component';
import { OnlineComponent } from './components/generic/courses/courses-selection/online/online.component';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coursesReducer } from '@app/example/components/generic/courses/example-courses.reducer';
import { TodosComponent } from './components/generic/todos/todos.component';
// import { UIRouterModule } from '@uirouter/angular';


const routes: Routes = [
  { path: 'example/home', component: ExampleHomeComponent },
  { path: 'example/sc/login', component: SpringCloudLoginComponent },
  { path: 'example/oauthtoken', component: OauthTokenComponent },
  { path: 'example/employees', component: EmployeeListComponent },
  { path: 'example/pagination', component: ConsumingHttpComponent },
  { path: 'example/courses', component: CoursesComponent },
  { path: 'example/todos', component: TodosComponent },
  { path: 'example/course-select/:courseId', component: CoursesSelectionComponent },
  { path: 'example/3ways', component: PageThreeWaysComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    TranslateModule.forRoot(),
    // UIRouterModule.forChild(
    //   states:
    // ),
    RouterModule.forChild(routes),
    StoreModule.forFeature('courses', coursesReducer),
    // StoreModule.forFeature('lessons', lessonsReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([CourseEffects])
  ],
  declarations: [
    ExampleHomeComponent,
    CoursesComponent,
    JokeComponent,
    JokeListComponent,
    JokeListParentComponent,
    EmployeeListComponent,
    PageThreeWaysComponent, BloggerComponent, Posts1Component, Posts2Component, Posts3Component,
    OauthTokenComponent,
    RxjsHomeComponent,
    SpringCloudLoginComponent,
    CardHostingComponent,
    CardComponent,
    PaginationComponent,
    Pagination2Component,
    ConsumingHttpComponent,
    CoursesSelectionComponent,
    CoursesListComponent,
    OnlineComponent,
    TodosComponent,
  ],
  exports: [
    ExampleHomeComponent,
    CoursesComponent,
    JokeComponent,
    JokeListComponent,
    JokeListParentComponent,
    EmployeeListComponent,
    PageThreeWaysComponent, BloggerComponent, Posts1Component, Posts2Component, Posts3Component,
    OauthTokenComponent,
    RxjsHomeComponent,
    SpringCloudLoginComponent
  ],
  providers: [
    CoursesService,
    EmployeeService,
    SpringCloudLoginService,
    PostsService
  ]
})
export class ExampleModule { }
