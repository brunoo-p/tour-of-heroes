import { MessageService } from './../messages/message.service';

import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './interface/hero.interface';


@Component({
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService : HeroService, private messageService : MessageService) { }

  heroes : Hero[] = [];
  selectedHero? : Hero;

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() : void {
    this.heroService.getHeroes().subscribe({
      next: heroes => this.heroes = heroes,
      error: err => console.log("Error:", err)
    })
  }

  add( name: string ): void {
    name = name.trim();
    if (!name) { return; }

    this.heroService.add({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete( hero : Hero ) : void {
    this.heroes = this.heroes.filter(h => h.id !== hero.id);
    this.heroService.delete(hero.id).subscribe();
  }

}
