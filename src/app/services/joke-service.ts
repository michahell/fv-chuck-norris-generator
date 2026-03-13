import { inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { JokeApiResponse } from './jokes.model';

export const API_BASE_URL = 'https://api.chucknorris.io';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  #http = inject(HttpClient);

  /**
   * Get a random joke from the Chuck Norris Joke API
   *
   */
  getRandomJoke(): Observable<JokeApiResponse> {
    return this.#http.get<JokeApiResponse>(`${API_BASE_URL}/jokes/random`).pipe(
      map((response: JokeApiResponse) => response),
      catchError(error => {
        console.error('Error fetching joke:', error);
        throw new Error('Failed to fetch joke. Please try again.');
      })
    );
  }
}
