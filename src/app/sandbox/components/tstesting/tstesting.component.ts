import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tstesting',
  templateUrl: './tstesting.component.html',
  styleUrls: ['./tstesting.component.scss'],
})
export class TstestingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

    const observer = observable.subscribe(
      (x: any) => this.addItem(x),
      (error: any) => this.addItem(error),
      () => this.addItem('Completed')
    );

    setTimeout(() => {
      observer.unsubscribe();
    }, 6001);
  }

  ngOnInit1() {
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
