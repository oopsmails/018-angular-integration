import { Component, OnInit } from '@angular/core';

import { Course, UserTokens } from '@app/shared/model';
import { CoursesService } from './courses.service';
import { UserTokenService } from '@app/shared/services/user-token/user-token.service';
import { OauthToken } from '@app/shared/model/oauthToken';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  userTokens: UserTokens;
  oauthToken: OauthToken;

  constructor(
    private coursesService: CoursesService,
    private usertokenService: UserTokenService
  ) { }

  loadUserTokens(): void {
    this.usertokenService.getUserToken() //
      .subscribe(oauthToken => this.oauthToken = oauthToken, // Bind to view
        err => {
          console.log(err);
        });
  }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
    this.loadUserTokens();
  }

}
