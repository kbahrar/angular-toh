import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private msgService: MessagesService
  ) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(data => this.heroes = data);
  }

  addHero(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({name} as Hero).subscribe(data => {
      this.heroes.push(data);
    })
  }

  delete(hero: Hero):void {
    this.heroes = this.heroes.filter(item => item.id !== hero.id);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
