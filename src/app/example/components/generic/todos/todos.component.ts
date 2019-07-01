import { Component, OnInit, Input } from '@angular/core';

class TodoItem {
  isDone: boolean;
  name: string;
  constructor(isDone: boolean, name: string) {
    this.isDone = isDone;
    this.name = name;
  }
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styles: [`
    .is-done {
      text-decoration: line-through;
    }
  `]
})
export class TodosComponent implements OnInit {

  @Input() public name = '';

  public items: Array<TodoItem> = [
    new TodoItem(false, 'aaa'),
    new TodoItem(false, 'bbb')
  ];

  constructor() { }

  ngOnInit() {
  }

  public getRemainingCount() {
    return this.items.filter(item => !item.isDone).length;
  }

  public add(name) {
    if (name === undefined || name === '') {
      return;
    }

    this.items.push(new TodoItem(false, name));
    this.name = '';
  }

  public addByNgModel() {
    if (this.name === undefined || this.name === '') {
      return;
    }

    this.items.push(new TodoItem(false, this.name));
    this.name = '';
  }

  public toggleItem(item: TodoItem) {
    item.isDone = !item.isDone;
  }

}
