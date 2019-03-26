import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesService } from './components/courses/courses.service';
import { ProgressingHomeComponent } from './components/progressing-home/progressing-home.component';

const routes: Routes = [
  {  path: 'progressing/home', component: ProgressingHomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CoursesComponent,
    ProgressingHomeComponent
  ],
  exports: [
    CoursesComponent
  ],
  providers: [
    CoursesService
  ],
})
export class ProgressingModule { }
