import { Component, Input, OnInit } from '@angular/core';
import { CourseType, OnlineCourse } from '@app/shared/model';
import { StateService } from '@uirouter/core';

import { CoursesComponent } from './../../courses.component';
import { CoursesService } from './../../courses.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent extends CoursesComponent implements OnInit {

  @Input() course: OnlineCourse;

  constructor(
    // protected stateService: StateService,
    protected coursesService: CoursesService) {
      super(coursesService);
    // super(stateService, coursesService);
  }

  ngOnInit(): void {
    this.init(CourseType.ONLINE);
  }

  protected init(courseType: CourseType): void {
    super.init(courseType);
    
  }

}
