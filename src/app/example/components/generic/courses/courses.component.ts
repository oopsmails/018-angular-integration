import { Component, OnInit } from '@angular/core';
import { Course } from '@app/shared/model';
import { OauthToken } from '@app/shared/model/oauthToken';
import { UserTokenService } from '@app/shared/services/user-token/user-token.service';
import { CoursesService } from './courses.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  
  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.courses = this.coursesService.getCourses();
  }

}
