import { Component, OnInit } from '@angular/core';
import { AppError } from '@app/shared/common/app-error';
import { BadInput } from '@app/shared/common/bad-input';
import { NotFoundError } from '@app/shared/common/not-found-error';
import { TypiCodePost } from '@app/shared/model';

import { PaginationInputParam } from './../pagination/pagination.input.param';
import { PaginationOuputParam } from './../pagination/pagination.output.param';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-consuming-http',
  templateUrl: './consuming-http.component.html'
})
export class ConsumingHttpComponent implements OnInit {
  private allPosts = new Array<TypiCodePost>();
  posts = new Array<TypiCodePost>();
  loading = true;

  paginationInputParam: PaginationInputParam = new PaginationInputParam();
  paginationOuputParam = { pageClicked: 0, pageRange: new Array<number>() } as PaginationOuputParam;

  constructor(private postsService: PostsService) {
    this.paginationInputParam.numberOfPageCombine = 3;
  }

  ngOnInit() {
    this.postsService.getAllPosts().subscribe(postsRet => {
      this.allPosts = postsRet;
      this.paginationInputParam.itemCount = this.allPosts.length;
      this.getData(this.paginationOuputParam);
      this.loading = false;
    });
  }

  createPost(input: HTMLInputElement) {
    console.log('input.value=', input.value);
    const newPost = { title: input.value } as TypiCodePost;
    input.value = '';
    this.loading = true;

    this.postsService.create(newPost)
      .subscribe(
        (createdPost: TypiCodePost) => {
          newPost.id = createdPost.id;
          this.allPosts.push(newPost);
          // this.allPosts.sort(TypiCodePost.sortById);
          // this.paginationInputParam.itemCount = this.allPosts.length;
          // const startIndex = this.paginationInputParam.currentPage * this.paginationInputParam.itemsPerPage;
          // const endIndex = (startIndex + this.paginationInputParam.itemsPerPage) < this.allPosts.length ?
          //   (startIndex + this.paginationInputParam.itemsPerPage) : this.allPosts.length;
          // this.posts = this.allPosts.slice(startIndex, endIndex);

          this.getData(this.paginationOuputParam);

          this.loading = false;
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
    this.loading = true;
    this.postsService.delete(post.id)
      .subscribe(
        () => {
          const index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
          const indexAll = this.allPosts.indexOf(post);
          this.allPosts.splice(indexAll, 1);
          // this.paginationInputParam.itemCount = this.allPosts.length;
          this.getData(this.paginationOuputParam);
          this.loading = false;
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

  pageClick2(pageNumberClickedRet: PaginationOuputParam): void {
    this.getData(pageNumberClickedRet);
  }

  private getData(pageNumberClickedRet: PaginationOuputParam): void {
    this.paginationOuputParam = pageNumberClickedRet;

    this.paginationInputParam.itemCount = this.allPosts.length;
    const startIndex = pageNumberClickedRet.pageClicked * this.paginationInputParam.itemsPerPage;
    const endIndex = (startIndex + this.paginationInputParam.itemsPerPage) < this.allPosts.length ?
      (startIndex + this.paginationInputParam.itemsPerPage) : this.allPosts.length;
    console.log('startIndex=', startIndex);
    console.log('endIndex=', endIndex);
    this.posts = this.allPosts.slice(startIndex, endIndex);
  }

}
