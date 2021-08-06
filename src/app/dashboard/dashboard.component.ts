import { HeroService } from './../heroes/hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/interface/hero.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private heroService : HeroService) { }

  heroes : Hero[] = [];

  ngOnInit(): void {
  }

  getHeroes() : void {
    this.heroService.getHeroes().subscribe({
      next: heroes => this.heroes = heroes,
      error: err => console.log("Error:", err)
    })
  }
}
