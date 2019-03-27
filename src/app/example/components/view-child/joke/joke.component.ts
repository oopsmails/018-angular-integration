import { Component, Input } from '@angular/core';
import { Joke } from '@app/shared/model/joke';

@Component({
  selector: 'joke',
  templateUrl: './joke.component.html'
})
export class JokeComponent {
  @Input('joke') data: Joke;
}
