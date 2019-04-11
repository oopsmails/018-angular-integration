import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PaginationInputParam } from './pagination.input.param';

@Component({
  selector: 'app-pagination2',
  templateUrl: './pagination2.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class Pagination2Component implements OnInit {
  @Input() paginationInputParam: PaginationInputParam;
  @Output('pageClick2') pageClickEmitter: EventEmitter<{ pageClicked: number, pageRange?: Array<number> }> = new EventEmitter();

  numOfPages = 0;
  prevLabel = 'PREVIOUS';
  nextLabel = 'NEXT';
  ariaHeaderLabel = 'ARIA_HEADER';

  range = (start: number, end: number): Array<number> =>
    Array.from({ length: (end - start) }, (v: number, k: number) => k + start)

  ngOnInit(): void {
    console.log('Pagination2Component, ngOnInit: itemcount', this.paginationInputParam.itemCount);
    this.numOfPages = this.calcNumOfPages();
    this.setCurrentPage(this.paginationInputParam.currentPage);
  }

  pageClick2(index: number): void {
    console.log('pageClick2, index: ', index);
    if (!this.paginationInputParam.disableNavigation) {
      this.setCurrentPage(index);
      let indexArray: Array<number> = [];
      if (this.paginationInputParam.numberOfPageCombine > 1) {
        if (index >= this.getLastPageNumber()) {
          indexArray = this.range(this.getLastPageNumber(), this.numOfPages);
        } else {
          indexArray = Array.from({ length: (this.paginationInputParam.numberOfPageCombine) }, (v: number, k: number) => k + index);
        }
      } else {
        indexArray.push(index);
      }

      this.pageClickEmitter.emit({ pageClicked: index, pageRange: indexArray });
    }
  }

  private calcNumOfPages(): number {
    const count = this.paginationInputParam.itemsPerPage < 1 ?
      1 : Math.ceil(this.paginationInputParam.itemCount / this.paginationInputParam.itemsPerPage);
    return Math.max(count || 0, 1);
  }

  private setListItemClass(index: number): string[] {
    const CSS_CLASSES = {
      SELECTED: 'progress-pagination__number__item--selected',
      SINGLE: 'progress-pagination__number__item--selected--single',
      FIRST: 'progress-pagination__number__item--selected--first',
      LAST: 'progress-pagination__number__item--selected--last'
    };
    if (this.paginationInputParam.numberOfPageCombine === 1 && index === this.paginationInputParam.currentPage) {
      return [CSS_CLASSES.SELECTED, CSS_CLASSES.SINGLE];
    } else {
      if (index === this.paginationInputParam.currentPage) {
        return [CSS_CLASSES.SELECTED, CSS_CLASSES.FIRST];
      } else if (index === this.paginationInputParam.currentPage + this.paginationInputParam.numberOfPageCombine - 1) {
        return [CSS_CLASSES.SELECTED, CSS_CLASSES.LAST];
      } else if (index > this.paginationInputParam.currentPage
        && index < this.paginationInputParam.currentPage + this.paginationInputParam.numberOfPageCombine - 1) {
        return [CSS_CLASSES.SELECTED];
      }
    }
  }

  setCurrentPage(index): void {
    if (!this.paginationInputParam.disableNavigation || this.paginationInputParam.numberOfPageCombine > 1) {
      if (index > -1 && index < this.getLastPageNumber()) {
        this.paginationInputParam.currentPage = index;
      } else if (index < 0) {
        this.paginationInputParam.currentPage = 0;
      } else {
        this.paginationInputParam.currentPage = this.getLastPageNumber();
      }
      // console.log("setCurrentPage, this.currentPage: ", this.currentPage);
    }
  }

  getLastPageNumber(): number {
    // console.log("getLastPageNumber, lastPageNum: ", this.numOfPages - this.numberOfPageCombine + 1);
    return this.numOfPages - this.paginationInputParam.numberOfPageCombine;
  }

}
