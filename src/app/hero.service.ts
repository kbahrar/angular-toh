import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessagesService } from './messages.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private msgService: MessagesService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes =  of(HEROES);
    this.msgService.addMessage('heroes fetched !');
    return heroes;
  }
}
