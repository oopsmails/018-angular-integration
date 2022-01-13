import { Component, Input } from '@angular/core';
import { Joke } from '@app/shared/model/joke';

@Component({
  selector: 'joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent {
  @Input('joke') data: Joke;
}
