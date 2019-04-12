import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Course, CourseType } from '@app/shared/model';
import { TranslateService } from '@ngx-translate/core';

import { CoursesService } from './../courses.service';

@Component({
  selector: 'app-courses-selection',
  templateUrl: './courses-selection.component.html',
  styleUrls: ['./courses-selection.component.scss']
})
export class CoursesSelectionComponent implements OnInit {
  @Input() course: Course;

  @ViewChild('online') onlineRef: TemplateRef<any>;
  @ViewChild('faceToFace') faceToFaceRef: TemplateRef<any>;

  courseType: any = CourseType;
  courseSelected: string;
  template: TemplateRef<any>;
  name: string;
  hasCourseCreatedBefore: boolean;

  constructor(private translateService: TranslateService, private coursesService: CoursesService) { }

  ngOnInit(): void {
    if (this.course !== undefined) {
      this.courseSelected = this.course.courseType;
      this.template = this.getTemplate();
    }
    // this.coursesService.hasCourseCreatedBefore().subsribe((result: boolean) => {
    //   this.hasCourseCreatedBefore = result;
    // });
  }

  courseChanged(): void {
    this.course = undefined;
    this.template = this.getTemplate();
    this.setName();
  }

  private getTemplate(): TemplateRef<any> {
    let template: TemplateRef<any> = undefined;

    switch (this.courseSelected) {
      case CourseType.ONLINE:
        template = this.onlineRef;
        break;
      case CourseType.FACE_TO_FACE:
        template = this.faceToFaceRef;
        break;
      default:
        break;
    }
    return template;
  }

  private setName(): void {
    const localeAlias = this.translateService.instant(`oopsmails.angular.integration.coursesSelection.alias.${this.courseSelected}`);
    const localeOpened = this.translateService.instant('oopsmails.angular.integration.coursesSelection.OPENED');
    this.name = `${localeAlias} - ${localeOpened}`;
  }
}
