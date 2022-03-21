import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: string[] = [];
  constructor() { }

  addMessage(msg: string): void {
    this.messages.push(msg);
  }

  clear() {
    this.messages = [];
  }
}
