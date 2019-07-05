import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  Observable, fromEvent, Subject, BehaviorSubject, ReplaySubject, AsyncSubject,
  merge,
  from,
  of
} from 'rxjs';
import { map, pluck, skipUntil, share, switchMap, tap, 
  debounceTime, mergeMap, concatMap, filter, distinctUntilChanged } from 'rxjs/operators';
import { Post } from '@app/shared/model';

@Component({
  selector: 'app-tstesting',
  templateUrl: './tstesting.component.html',
  styleUrls: ['./tstesting.component.scss'],
})
export class TstestingComponent implements OnInit {
  public readonly title = 'TS Testing';
  private loading: boolean;
  public searchTerm: string;

  constructor(private httpClient: HttpClient) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    // this.ngOnInit_shareToAvoidHttpCallTwice();
    // this.ngOnInit_switchMap();
    this.ngOnInit_debounceTime();
  }
  ngOnInit_debounceTime() {

  }

  search(text$: Observable<string>): Observable<string[]> {
    return text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        if (!searchTerm) {
          return [];
        }
        return this.getPosts(searchTerm);
      })
    );
  }

  ngOnInit_switchMap() {
    const postsObs = this.getPosts();
    const commentsObs = this.getComments();

    const combined = postsObs.pipe(
      switchMap(posts => {
        return commentsObs
          .pipe(
            tap(comments => {
              console.log('comments:', comments);
              console.log('posts:', posts);
            })
          );
      })
    );

    combined.subscribe();
  }

  ngOnInit_shareToAvoidHttpCallTwice() {
    const request = this.getPosts();
    this.setLoadingSpinner(request);

    request.subscribe(data => {
      console.log(data);
      this.addItem(data);
    }
    );
  }

  setLoadingSpinner(observable: Observable<any>) {
    this.loading = true;
    observable.subscribe(() => this.loading = false);
  }

  getPosts(searchTerm ?: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        concatMap(data => {
          if (data.length === 0) {
            return of([]);
          } else {
            return of(data);
          }
        }),
        map( post =>
            post.filter(onePost => onePost.body.indexOf(searchTerm) >= 0)
        ),
        share()
      ); // if no share() here, then calling GET twice!!!
  }

  getComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
      .pipe(share()); // if no share() here, then calling GET twice!!!
  }

  ngOnInit_map_pluck_skipUntil() {
    Observable.create((observer: any) => {
      observer.next('Hey guys!');
    }).pipe(
      map((val: any) => val.toUpperCase())
    ).subscribe((x: any) => this.addItem(x));

    from([
      { first: 'Gary', last: 'Simon', age: '34' },
      { first: 'Jane', last: 'Simon', age: '34' },
      { first: 'John', last: 'Simon', age: '34' },
    ]).pipe(
      pluck('first')
    ).subscribe((x: any) => this.addItem(x));

    let refreshIntervalId;
    const observable1 = Observable.create((data: any) => {
      let i = 1;
      refreshIntervalId = setInterval(() => {
        data.next(i++);
      }, 1000);
    });

    const observable2 = new Subject();

    setTimeout(() => {
      observable2.next('Hey!');
      // observable2.complete();
    }, 3000);

    const newObs = observable1.pipe(
      skipUntil(observable2)
    );

    setTimeout(() => {
      clearInterval(refreshIntervalId);
    }, 8000);

    newObs.subscribe((x: any) => this.addItem(x));

  }

  ngOnInit_merge() {
    const observable = Observable.create((observer: any) => {
      observer.next('Hey guys!');
    });

    const observable2 = Observable.create((observer: any) => {
      observer.next('How is it going?');
    });

    // We're using our merge operator here:
    const newObs = merge(observable, observable2);

    newObs.subscribe((x: any) => this.addItem(x));
  }

  ngOnInit_AsyncSubject() {
    const subject = new AsyncSubject(); // return ONLY last msg and ONLY send when .complete() is called.

    subject.subscribe(
      data => this.addItem('Observer 1: ' + data),
      () => this.addItem('Observer 1 Completed')
    );

    let i = 1;
    setInterval(() => subject.next(i++), 100);

    setTimeout(() => {
      const observer2 = subject.subscribe(
        data => this.addItem('Observer 2: ' + data)
      );
      subject.complete();
    }, 500);
  }

  ngOnInit_ReplaySubject2() {
    // tslint:disable-next-line:max-line-length
    const subject = new ReplaySubject(30, 200); // new ReplaySubject(30, 200), return the last 30 emitted values (events) ...within 200 milliseconds

    subject.subscribe(
      data => this.addItem('Observer 1: ' + data),
      err => this.addItem(err),
      () => this.addItem('Observer 1 Completed')
    );

    let i = 1;
    const int = setInterval(() => subject.next(i++), 100);

    setTimeout(() => {
      const observer2 = subject.subscribe(
        data => this.addItem('Observer 2: ' + data)
      );
      clearInterval(int);
    }, 500);
  }

  ngOnInit_ReplaySubject1() {
    // tslint:disable-next-line:max-line-length
    const subject = new ReplaySubject(2); // new ReplaySubject(30, 200), return the last 30 emitted values (events) ...within 200 milliseconds

    subject.subscribe(
      data => this.addItem('Observer 1: ' + data),
      err => this.addItem(err),
      () => this.addItem('Observer 1 Completed')
    );

    subject.next('The first thing has been sent');
    subject.next('Another thing has been sent');
    subject.next('...Observer 2 is about to subscribe...'); // Subject vs. ReplaySubject, observer2 will get defined previous msg.

    const observer2 = subject.subscribe(
      data => this.addItem('Observer 2: ' + data)
    );

    subject.next('The second thing has been sent');
    subject.next('A third thing has been sent');

    observer2.unsubscribe();

    subject.next('A final thing has been sent');
  }

  ngOnInit_BehaviorSubject() {
    const subject = new BehaviorSubject('First');

    subject.subscribe(
      data => this.addItem('Observer 1: ' + data),
      err => this.addItem(err),
      () => this.addItem('Observer 1 Completed')
    );

    subject.next('The first thing has been sent');
    subject.next('...Observer 2 is about to subscribe...'); // Subject vs. BehaviorSubject, observer2 will get one previous msg.

    const observer2 = subject.subscribe(
      data => this.addItem('Observer 2: ' + data)
    );

    subject.next('The second thing has been sent');
    subject.next('A third thing has been sent');

    observer2.unsubscribe();

    subject.next('A final thing has been sent');
  }

  ngOnInit_Subject() {
    const subject = new Subject();

    subject.subscribe(
      data => this.addItem('Observer 1: ' + data),
      err => this.addItem(err),
      () => this.addItem('Observer 1 Completed')
    );

    subject.next('The first thing has been sent');

    const observer2 = subject.subscribe(
      data => this.addItem('Observer 2: ' + data)
    );

    subject.next('The second thing has been sent');
    subject.next('A third thing has been sent');

    observer2.unsubscribe();

    subject.next('A final thing has been sent');
  }

  ngOnInit_share() {
    let refreshIntervalId;
    const observable = Observable.create((observer: any) => {
      try {
        observer.next('Hey guys!');
        observer.next('How are you?');
        refreshIntervalId = setInterval(() => {
          observer.next('I am good');
        }, 2000);
      } catch (err) {
        observer.error(err);
      }
    }).pipe(
      share()
    ); // make it hot?

    const subscription = observable.subscribe(
      (x: any) => this.addItem(x),
      (error: any) => this.addItem(error),
      () => this.addItem('Completed')
    );

    setTimeout(() => {
      const subscription2 = observable.subscribe(
        (x: any) => this.addItem('Subscriber 2: ' + x)
      );
    }, 1000);

    setTimeout(() => {
      clearInterval(refreshIntervalId);
    }, 8000);
  }

  ngOnInit_Observable2() {
    const observable = Observable.create((observer: any) => {
      try {
        observer.next('Hey guys!');
        observer.next('How are you?');
        setInterval(() => {
          observer.next('I am good');
        }, 2000);
      } catch (err) {
        observer.error(err);
      }
    });

    const subscription = observable.subscribe(
      (x: any) => this.addItem(x),
      (error: any) => this.addItem(error),
      () => this.addItem('Completed')
    );

    const subscription2 = observable.subscribe(
      (x: any) => this.addItem(x)
    );

    subscription.add(subscription2);

    setTimeout(() => {
      subscription.unsubscribe();
    }, 6001);
  }

  ngOnInit_Observable1() {
    const observable = Observable.create((observer: any) => {
      try {
        observer.next('Hey guys!');
        observer.next('How are you?');
        observer.complete();
        observer.next('This will not send');
      } catch (err) {
        observer.error(err);
      }
    });

    observable.subscribe(
      (x: any) => this.addItem(x),
      (error: any) => this.addItem(error),
      () => this.addItem('Completed')
    );
  }

  addItem(val: any) {
    const node = document.createElement('li');
    const textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById('output').appendChild(node);
  }

}
