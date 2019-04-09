import { Component, OnInit } from '@angular/core';
import { AppError } from '@app/shared/common/app-error';
import { BadInput } from '@app/shared/common/bad-input';
import { NotFoundError } from '@app/shared/common/not-found-error';
import { TypiCodePost } from '@app/shared/model';
import { Subject } from 'rxjs';

import { PaginationConfig } from '../pagination/pagination-config';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-consuming-http',
  templateUrl: './consuming-http.component.html'
})
export class ConsumingHttpComponent implements OnInit {
  private allPosts = new Array<TypiCodePost>();
  private allPostSubject = new Subject<TypiCodePost[]>();

  paginationConfig: PaginationConfig = new PaginationConfig();

  // pager object
  pager: any = {};

  // paged items
  private posts = new Array<TypiCodePost>();

  loading = false;
  itemCount = 0;
  pageNumber = 0;
  itemsPerPage = 5;

  // numberOfPageCombine = 1;
  // backgroundType = 'light';
  // hiddenArrows = false;
  // disableNavigation = false;

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    // this.getPosts({ page: this.pageNumber, itemsPerPage: this.itemsPerPage });
    this.getPosts({ page: 0, size: this.itemsPerPage });
  }

  getPosts(pageInfo): void {
    this.loading = true;
    this.postsService.getAllPosts().subscribe(postsRet => {
      this.paginationConfig.itemCount = postsRet.length;
      this.paginationConfig.numberOfPageCombine = 3;

      this.allPosts = postsRet;
      this.getData({ pageClicked: 0, pageRange: [] });
      this.loading = false;
    });
  }

  private getData(pageNumberClickedRet: { pageClicked: number, pageRange?: Array<number> }): void {
    this.itemCount = this.allPosts.length;
    const startIndex = pageNumberClickedRet.pageClicked * this.itemsPerPage;
    const endIndex = (startIndex + this.itemsPerPage) < this.allPosts.length ?
      (startIndex + this.itemsPerPage) : this.allPosts.length;
    console.log('startIndex=', startIndex);
    console.log('endIndex=', endIndex);
    this.posts = this.allPosts.slice(startIndex, endIndex);
  }

  // getPostsSubject(pageInfo): void {
  //   this.loading = true;
  //   this.service.getAll().subscribe(postsRet => {
  //     this.allPostSubject.next(postsRet);
  //   });
  // }

  // getPostsSwitchMap(pageInfo): void {
  //   this.loading = true;
  //   this.service.getAll().subscribe(postsRet => {
  //     this.allPosts = postsRet;
  //     this.itemCount = this.allPosts.length;
  //     this.loading = false;
  //   });
  // }

  // getPostsPromise(pageInfo): void {
  //   this.service.getAllPromise().then(postsRet => {
  //     this.allPosts = postsRet;
  //     this.itemCount = this.allPosts.length;
  //     this.posts = this.allPosts.splice(1, pageInfo.itemsPerPage);
  //     this.loading = false;
  //   });

  // }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value } as TypiCodePost;
    input.value = '';

    this.postsService.create(post)
      .subscribe(
        (newPost: TypiCodePost) => {
          // post.id = newPost.id;
          // this.posts.splice(0, 0, post);
          this.allPosts.push(newPost);
          this.allPosts.sort((a, b) => (a.id > b.id) ? 1 : -1);
        },
        (error: AppError) => {
          if (error instanceof BadInput) {
            // this.form.setErrors(error.originalError);
          } else {
            throw error;
          }
        });
  }

  updatePost(post: TypiCodePost) {
    this.postsService.update(post)
      .subscribe(
        updatedPost => {
          console.log(updatedPost);
        });
  }

  deletePost(post) {
    this.postsService.delete(post.id)
      .subscribe(
        () => {
          const index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
          const indexAll = this.allPosts.indexOf(post);
          this.allPosts.splice(indexAll, 1);
          this.itemCount = this.allPosts.length;
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            // no need to roll back because it is already deleted
            alert('This post has already been deleted.');
          } else {
            // roll back needed here ??
            // this.posts.push();
            throw error;
          }
        });
  }

  onPageChange(pageNumberClickedRet: { pageClicked: number, pageRange?: Array<number> }): void {
    // indexRet.forEach((item: number) => {
    //   console.log('pageClick, index array: ', item);
    // });
    // this.pageNumber = indexRet[0];
    // this.getPostsNoHttpCall({ page: this.pageNumber, size: this.itemsPerPage });

    this.getData(pageNumberClickedRet);
  }

}
