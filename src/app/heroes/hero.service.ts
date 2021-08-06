import { MessageService } from './../messages/message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HEROES } from '../server/mock-heroes';
import { Hero } from './interface/hero.interface';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes () : Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add("HeroService: fetched heroes df")
    return heroes;
  }

  getHeroById( id : number ) : Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
