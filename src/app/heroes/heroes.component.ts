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
  selectedHero?: Hero;

  constructor(
    private heroService: HeroService,
    private msgService: MessagesService
  ) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(data => this.heroes = data);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.msgService.addMessage(`hero selected id=${hero.id}`)
  }

}
