import { MessageService } from './../messages/message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HEROES } from '../server/mock-heroes';
import { Hero } from './interface/hero.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService, private http : HttpClient) { }


  private heroesUrl = 'api/heroes';

  private log( message : string ) {
    this.messageService.add(`HeroService: ${message}`);
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  getHeroes () : Observable<Hero[]> {

    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );

  }

  getHeroById( id : number ) : Observable<Hero> {

    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(_ => this.log(`Fetched hero with id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );

  }

  save( hero : Hero ) : Observable<any> {

    return this.http.put<any>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>("save"))
    );
  }

  add( hero: Hero ): Observable<Hero> {

    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  delete( heroId : number ) : Observable<Hero> {

    return this.http.delete<Hero>(`${this.heroesUrl}/${ heroId }`, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Hero id: ${ heroId }`)),
      catchError(this.handleError<Hero>('delete'))
    );
  }

  searchHeroes( term : string ) : Observable<Hero[]> {
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length

        ? this.log(`found heroes matching "${term}"`)
        : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
