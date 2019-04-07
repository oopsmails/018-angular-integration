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
import { ExampleHomeComponent } from './components/example-home/example-home.component';
import { CoursesComponent } from './components/generic/courses/courses.component';
import { CoursesService } from './components/generic/courses/courses.service';
import { EmployeeListComponent } from './components/generic/employee/employee-list/employee-list.component';
import { EmployeeService } from './components/generic/employee/employee.service';
import { OauthTokenComponent } from './components/generic/employee/oauth-token/oauth-token.component';
import { RxjsHomeComponent } from './components/rxjs-home/rxjs-home.component';
import { JokeListParentComponent } from './components/view-child/joke-list-parent/joke-list-parent.component';
import { JokeListComponent } from './components/view-child/joke-list/joke-list.component';
import { JokeComponent } from './components/view-child/joke/joke.component';



const routes: Routes = [
  { path: 'example/home', component: ExampleHomeComponent },
  { path: 'example/sc/login', component: SpringCloudLoginComponent },
  { path: 'example/oauthtoken', component: OauthTokenComponent },
  { path: 'example/employees', component: EmployeeListComponent },
  { path: 'example/3ways', component: PageThreeWaysComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes)
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
    CardComponent
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
    SpringCloudLoginService
  ]
})
export class ExampleModule { }
