import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, map, tap } from 'rxjs';
import { Hero } from './hero';
import { MessagesService } from './messages.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private msgService: MessagesService,
    private http: HttpClient
  ) { }

  getHeroes(): Observable<Hero[]> {
    const heroes =  this.http.get<Hero[]>(this.heroesUrl)
                    .pipe(
                      tap(_ => this.log('heroes fetched')),
                      catchError(this.handleError<Hero[]>('GetHeroes', []))
                    );
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const URL = `${this.heroesUrl}/${id}`;
    const hero =  this.http.get<Hero>(URL)
                  .pipe(
                    tap(_ => this.log(`hero fetched id=${id}`)),
                    catchError(this.handleError<Hero>(`getHero id=${id}`))
                  );
    return hero;
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('update hero'))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added Hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('added Hero'))
    )
  }

  deleteHero(id: number): Observable<Hero> {
    const URL = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(URL, this.httpOptions).pipe(
      tap(_ => `deleted hero id=${id}`),
      catchError(this.handleError<Hero>('deleted Hero'))
    )
  }

  searchHero(term: string): Observable<Hero[]> {
    if (!term.trim()) return of([]);
    const URL = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(URL).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching ${term}`) :
        this.log(`found nothing about ${term}`)),
      catchError(this.handleError<Hero[]>('search Heroes', []))
    )
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.msgService.addMessage(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
