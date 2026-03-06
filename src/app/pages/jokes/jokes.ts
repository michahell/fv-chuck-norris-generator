import {Component, inject, OnInit, signal} from '@angular/core';
import {JokeFacade} from '../../services/joke-facade';
import {toSignal} from '@angular/core/rxjs-interop';
import {Joke} from '../../components/joke/joke';

@Component({
  selector: 'app-jokes',
  imports: [Joke],
  templateUrl: './jokes.html',
  styleUrl: './jokes.css',
})
export default class Jokes implements OnInit {
  #facade = inject(JokeFacade);
  latestJokes = toSignal(this.#facade.latestJokes$);
  fetchingJokes = signal<boolean>(false);

  ngOnInit(): void {
    this.startGettingRandomJokes();
    setTimeout(() => {
      this.stopGettingRandomJokes();
    }, 5000);
  }

  startGettingRandomJokes(): void {
    this.#facade.startGettingRandomJokes();
    this.fetchingJokes.set(true);
  }

  stopGettingRandomJokes(): void {
    this.#facade.stopGettingRandomJokes();
    this.fetchingJokes.set(false);
  }
}
