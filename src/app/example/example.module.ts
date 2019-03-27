import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { ExampleHomeComponent } from './components/example-home/example-home.component';
import { CoursesComponent } from './components/generic/courses/courses.component';
import { CoursesService } from './components/generic/courses/courses.service';
import { JokeListParentComponent } from './components/view-child/joke-list-parent/joke-list-parent.component';
import { JokeListComponent } from './components/view-child/joke-list/joke-list.component';
import { JokeComponent } from './components/view-child/joke/joke.component';


const routes: Routes = [
  { path: 'example/home', component: ExampleHomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CoursesComponent,
    ExampleHomeComponent,
    JokeComponent,
    JokeListComponent,
    JokeListParentComponent
  ],
  exports: [
    ExampleHomeComponent,
    CoursesComponent,
    JokeComponent,
    JokeListComponent,
    JokeListParentComponent
  ],
  providers: [
    CoursesService
  ]
})
export class ExampleModule { }
