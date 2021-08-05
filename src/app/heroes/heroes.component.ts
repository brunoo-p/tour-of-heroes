import { Component, OnInit } from '@angular/core';
import { HEROES } from '../server/mock-heroes';
import { Hero } from './interface/hero.interface';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  heroes : Hero[] = HEROES;
  selectedHero? : Hero;

  ngOnInit(): void {

  }

  onSelect( hero : Hero ) : void {
    this.selectedHero = hero;
  }

}
