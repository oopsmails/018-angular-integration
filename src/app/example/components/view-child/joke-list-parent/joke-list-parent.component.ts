import { Component } from '@angular/core';
import { Joke } from '@app/shared/model/joke';

@Component({
  selector: 'joke-list-parent',
  templateUrl: './joke-list-parent.component.html'
})
export class JokeListParentComponent {

  joke: Joke = new Joke('A kid threw a lump of cheddar at me', 'I thought ‘That’s not very mature’');

}
