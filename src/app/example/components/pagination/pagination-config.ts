export class PaginationConfig {
    currentPage?: number = 0;
    clickedPageNumber?: number = 1;
    itemCount: number;
    itemsPerPage?: number = 5;
    numberOfPageCombine?: number = 1;
    backgroundType?: string = 'light';
    hiddenArrows?: boolean= false;
    disableNavigation?: boolean= false;
}
