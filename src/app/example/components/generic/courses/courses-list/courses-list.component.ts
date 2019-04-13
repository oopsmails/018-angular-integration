import { CoursesService } from './../courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '@app/shared/model';
import { PaginationInputParam } from '@app/example/components/pagination/pagination.input.param';
import { PaginationOuputParam } from '@app/example/components/pagination/pagination.output.param';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  private itemsOnPage = new Array<Course>();
  private allItems = new Array<Course>();
  loading = true;

  paginationInputParam: PaginationInputParam = new PaginationInputParam();
  paginationOuputParam = { pageClicked: 0, pageRange: new Array<number>() } as PaginationOuputParam;
  
  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
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
