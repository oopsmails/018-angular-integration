import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInputParam } from '@app/example/components/pagination/pagination.input.param';
import { PaginationOuputParam } from '@app/example/components/pagination/pagination.output.param';
import { AppState } from '@app/ngrxstore/reducers';
import { Course } from '@app/shared/model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CoursesService } from './../courses.service';
import { AllCoursesRequested } from './../example-courses.actions';
import { selectAllCourses } from './../example-courses.selectors';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  itemsOnPage = new Array<Course>();
  private allItems = new Array<Course>();
  loading = true;

  private storeAllItems = new Array<Course>();

  paginationInputParam: PaginationInputParam = new PaginationInputParam();
  paginationOuputParam = { pageClicked: 0, pageRange: new Array<number>() } as PaginationOuputParam;

  beginnerCourses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(new AllCoursesRequested());
    this.beginnerCourses$ = this.store.pipe(select(selectAllCourses));


    this.coursesService.getCourses().subscribe(retVal => {
      this.allItems = retVal;
      this.paginationInputParam.itemCount = this.allItems.length;
      this.getData(this.paginationOuputParam);
      this.loading = false;
    });
  }

  goToCourse(url: string, course: Course): void {
    const realUrl = url + '/' + course.courseId;
    // this.router.navigateByUrl(realUrl).then(e => {
    //   if (e) {
    //     console.log("Navigation is successful!");
    //   } else {
    //     console.log("Navigation has failed!");
    //   }
    // });
    this.router.navigateByUrl(realUrl, { state: { course: course } });
  }

  pageClick2(pageNumberClickedRet: PaginationOuputParam): void {
    this.getData(pageNumberClickedRet);
  }

  private getData(pageNumberClickedRet: PaginationOuputParam): void {
    this.paginationOuputParam = pageNumberClickedRet;

    this.paginationInputParam.itemCount = this.allItems.length;
    const startIndex = pageNumberClickedRet.pageClicked * this.paginationInputParam.itemsPerPage;
    const endIndex = (startIndex + this.paginationInputParam.itemsPerPage) < this.allItems.length ?
      (startIndex + this.paginationInputParam.itemsPerPage) : this.allItems.length;
    console.log('startIndex=', startIndex);
    console.log('endIndex=', endIndex);
    this.itemsOnPage = this.allItems.slice(startIndex, endIndex);
  }
}
