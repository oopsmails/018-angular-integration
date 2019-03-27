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
  oauthToken: OauthToken;
  constructor(
    private coursesService: CoursesService,
    private usertokenService: UserTokenService
  ) { }

  ngOnInit(): void {
    this.courses = this.coursesService.getCourses();
    this.loadUserTokens();
  }

  loadUserTokens(): void {
    this.usertokenService.getUserToken() //
      .subscribe(oauthToken => this.oauthToken = oauthToken, // Bind to view
        err => {
          console.log(err);
        });
  }
}
