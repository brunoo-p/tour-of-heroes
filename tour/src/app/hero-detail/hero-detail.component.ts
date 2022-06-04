import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../heroes/hero.service';
import { Hero } from '../heroes/interface/hero.interface';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private heroService : HeroService,
    private route : ActivatedRoute,
    private location : Location
  ) { }

  @Input() hero? : Hero;

  ngOnInit(): void {
    this.getHero();
  }

  getHero() : void {
    const heroId = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHeroById( heroId ).subscribe({
      next: hero => this.hero = hero,
      error: err => console.log("Error: ", err)


    })
  }

  save() : void {
    if(this.hero){
      this.heroService.save(this.hero).subscribe( () => this.goBack());
    }
  }

  goBack() : void {
    this.location.back();
  }

}
