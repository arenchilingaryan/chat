import {Component, DoCheck, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements DoCheck {
  constructor() { }

  @Input() status;
  @Input() nickName;

  messages = [];

  ngDoCheck(): void {
    const messagesData = localStorage.getItem('messages');
    const data = JSON.parse(messagesData)
    this.messages = data;
  }

  value = '';

  pushCreator(message) {
    return {
      name: this.nickName,
      value: message
    };
  }
  onSendMessage(form) {
    const newArray = [];
    if (form.value.message !== '') {
      if (this.messages !== null) {
        newArray.push(...this.messages, this.pushCreator(form.value.message));
      } else {
        newArray.push(this.pushCreator(form.value.message));
      }
      this.messages = newArray;
      localStorage.setItem(`messages`, `${JSON.stringify(this.messages)}`);
    } else {
      alert('debil');
    }
    form.value.message = '';
    this.value = ''
  }

  logOut() {
    localStorage.removeItem('nickName');
    this.nickName = null;
  }

}
