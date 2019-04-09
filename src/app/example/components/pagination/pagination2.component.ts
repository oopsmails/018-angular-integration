import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { PaginationConfig } from './pagination-config';

@Component({
  selector: 'app-pagination2',
  templateUrl: './pagination2.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class Pagination2Component implements OnInit, OnChanges {

  @Input() paginationConfig: PaginationConfig;

  @Output('pageClick2') pageClickEmitter: EventEmitter<{ pageClicked: number, pageRange?: Array<number> }> = new EventEmitter();

  numOfPages = 0;
  prevLabel = 'PREVIOUS';
  nextLabel = 'NEXT';
  ariaHeaderLabel = 'ARIA_HEADER';

  constructor() {
  }

  ngOnInit(): void {
    console.log('Pagination2Component, ngOnInit: itemcount', this.paginationConfig.itemCount);
    this.numOfPages = this.calcNumOfPages();
    this.setCurrentPage(this.paginationConfig.currentPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Pagination2Component, ngOnChanges1: itemcount', this.paginationConfig.itemCount);
    if (changes['currentPage']) {
      console.log('Pagination2Component, ngOnChange2: itemcount', this.paginationConfig.itemCount);
      this.numOfPages = this.calcNumOfPages();
      this.setCurrentPage(this.paginationConfig.currentPage);
    }
  }

  calcNumOfPages(): number {
    const count = this.paginationConfig.itemsPerPage < 1 ?
      1 : Math.ceil(this.paginationConfig.itemCount / this.paginationConfig.itemsPerPage);
    return Math.max(count || 0, 1);
  }

  setListItemClass(index: number): string[] {
    const CSS_CLASSES = {
      SELECTED: 'progress-pagination__number__item--selected',
      SINGLE: 'progress-pagination__number__item--selected--single',
      FIRST: 'progress-pagination__number__item--selected--first',
      LAST: 'progress-pagination__number__item--selected--last'
    };
    if (this.paginationConfig.numberOfPageCombine === 1 && index === this.paginationConfig.currentPage) {
      return [CSS_CLASSES.SELECTED, CSS_CLASSES.SINGLE];
    } else {
      if (index === this.paginationConfig.currentPage) {
        return [CSS_CLASSES.SELECTED, CSS_CLASSES.FIRST];
      } else if (index === this.paginationConfig.currentPage + this.paginationConfig.numberOfPageCombine - 1) {
        return [CSS_CLASSES.SELECTED, CSS_CLASSES.LAST];
      } else if (index > this.paginationConfig.currentPage
        && index < this.paginationConfig.currentPage + this.paginationConfig.numberOfPageCombine - 1) {
        return [CSS_CLASSES.SELECTED];
      }
    }
  }

  pageClick2(index: number): void {
    console.log('pageClick2, index: ', index);
    if (!this.paginationConfig.disableNavigation) {
      this.setCurrentPage(index);
      let indexArray: Array<number> = [];
      if (this.paginationConfig.numberOfPageCombine > 1) {
        if (index >= this.getLastPageNumber()) {
          indexArray = this.range(this.getLastPageNumber(), this.numOfPages);
        } else {
          indexArray = Array.from({ length: (this.paginationConfig.numberOfPageCombine) }, (v: number, k: number) => k + index);
        }
      } else {
        indexArray.push(index);
      }

      this.pageClickEmitter.emit({ pageClicked: index, pageRange: indexArray });
    }
  }

  setCurrentPage(index): void {
    if (!this.paginationConfig.disableNavigation || this.paginationConfig.numberOfPageCombine > 1) {
      if (index > -1 && index < this.getLastPageNumber()) {
        this.paginationConfig.currentPage = index;
      } else if (index < 0) {
        this.paginationConfig.currentPage = 0;
      } else {
        this.paginationConfig.currentPage = this.getLastPageNumber();
      }
      // console.log("setCurrentPage, this.currentPage: ", this.currentPage);
    }
  }

  getLastPageNumber(): number {
    // console.log("getLastPageNumber, lastPageNum: ", this.numOfPages - this.numberOfPageCombine + 1);
    return this.numOfPages - this.paginationConfig.numberOfPageCombine;
  }

  range = (start: number, end: number): Array<number> =>
    Array.from({ length: (end - start) }, (v: number, k: number) => k + start)
}
