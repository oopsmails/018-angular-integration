import { Component, Input, OnInit } from '@angular/core';
import { LibFormStatus } from '@app/core/lib/components/form/lib-form.domain';
import { Course, CourseType } from '@app/shared/model';
import { StateService } from '@uirouter/core';

import { CoursesService } from './courses.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent {

  @Input() name: string

  course: Course;
  editMode: boolean = false;
  submitDisable: boolean = false;
  showSubmit: boolean = false;

  protected formTouched: boolean = false;
  protected formValid: boolean = false;
  protected validatedRows: { [key: string]: LibFormStatus; } = {};

  private coursePriceCheckMin: boolean = false;
  private courseId: string;

  constructor(
    // protected stateService: StateService,
    protected coursesService: CoursesService) { }

  protected init(courseType: CourseType): void {
    this.editMode = this.course !== undefined;

    if (!this.editMode) {
      this.course = {
        courseName: this.name,
        courseType: courseType
      }
    } else {
      this.courseId = this.course.courseId;
      this.coursePriceCheckMin = true;
    }
  }
}
