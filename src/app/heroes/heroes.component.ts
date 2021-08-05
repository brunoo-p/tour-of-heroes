import { MessageService } from './../messages/message.service';

import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './interface/hero.interface';


@Component({
  selector: 'app-heroes',
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

  onSelect( hero : Hero ) : void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero ${hero.name}`)
  }

  getHeroes() : void {
    this.heroService.getHeroes().subscribe({
      next: heroes => this.heroes = heroes,
      error: err => console.log("Error:", err)
    })
  }

}
