import { Component, Input, OnInit } from '@angular/core';
import { GroupPosts, Post } from '@app/shared/model';
import { BehaviorSubject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Component({
    selector: 'posts-3',
    template: `
    <div class="list-group">
        <div *ngFor="let group of groupPosts" class="list-group-item">
            <h4>{{ group.category }}</h4>
            <ul>
                <li *ngFor="let post of group.posts">
                    {{ post.title }}
                </li>
            </ul>
        <div>
    </div>
    `
})
export class Posts3Component implements OnInit {

    private _dataSubject = new BehaviorSubject<Post[]>([]);

    @Input()
    set data(value) {
        this._dataSubject.next(value);
    }

    get data() {
        return this._dataSubject.getValue();
    }

    groupPosts: GroupPosts[];

    constructor() { }

    ngOnInit() {
        this._dataSubject.asObservable().pipe(
            takeWhile(() => !this.groupPosts)) // unsubscribe once groupPosts has value
            .subscribe(x => {
                this.groupPosts = this.groupByCategory(this.data);
            });
    }

    groupByCategory(data: Post[]): GroupPosts[] {
        if (!data) { return };
        const categories = new Set(data.map(x => x.category));
        const result = Array.from(categories).map(x => ({
            category: x,
            posts: data.filter(post => post.category === x)
        }));

        return result;
    }
}
