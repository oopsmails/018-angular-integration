import { selectAllCourses } from './../example-courses.selectors';
import { AllCoursesRequested } from './../example-courses.actions';
import { CoursesService } from './../courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '@app/shared/model';
import { PaginationInputParam } from '@app/example/components/pagination/pagination.input.param';
import { PaginationOuputParam } from '@app/example/components/pagination/pagination.output.param';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/ngrxstore/reducers';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  private itemsOnPage = new Array<Course>();
  private allItems = new Array<Course>();
  loading = true;

  private storeAllItems = new Array<Course>();

  paginationInputParam: PaginationInputParam = new PaginationInputParam();
  paginationOuputParam = { pageClicked: 0, pageRange: new Array<number>() } as PaginationOuputParam;
  
  beginnerCourses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService, private store: Store<AppState>) { }

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
