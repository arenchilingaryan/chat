import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor(
    private router: Router
  ) {
  }
  messages = [];
  value = '';
  editValue = '';
  id = 0;
  idItem = null;
  nick = null;
  status = false;

  ngOnInit(): void {
    this.nick = localStorage.getItem('nickName');
    const messagesData = localStorage.getItem('messages');
    this.messages = JSON.parse(messagesData);
    if (this.nick == null) {
      this.router.navigate(['auth']);
      localStorage.setItem('status', 'false');
      alert('Не суй ручки в локалстор, проказник');
    } else {
      null
    }
    if (this.messages !== null) {
      this.id = this.messages.length;
    } else {
      this.id = 0;
    }
  }


  onDelete(event) {
    this.messages.map(i => {
      if (i.id == event.target.id) {
        const idx = this.messages.findIndex(el => el.id == event.target.id);
        const before = this.messages.slice(0, idx);
        const after = this.messages.slice(idx + 1);
        const newArr = [...before, ...after];
        this.messages = newArr;
      }
    });
    localStorage.setItem('messages', `${JSON.stringify(this.messages)}`);
  }

  findId(event) {
    this.idItem = event.target.id;
  }

  onEnterChangeEdit(event) {
    this.messages.map(i => {
      if (i.id == this.idItem) {
        i.value = event.value.editValue;
        i.edit = !i.edit;
      }
    });
    localStorage.setItem('messages', `${JSON.stringify(this.messages)}`);
  }

  onChangeEdit(event) {
    this.messages.map(i => {
      if (i.id == event.target.id) {
        i.edit = !i.edit;
      }
    });
    this.editValue = '';
    localStorage.setItem('messages', `${JSON.stringify(this.messages)}`);
  }


  pushCreator(message) {
    return {
      id: this.id + 1,
      name: this.nick,
      value: message,
      edit: false
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
      this.id = this.id + 1;
    } else {
      alert('так низя');
    }
    form.value.message = '';
    this.value = '';
  }

  logOut() {
    localStorage.removeItem('nickName');
    localStorage.removeItem('status');
    this.router.navigate(['auth']);
    this.nick = null;
  }

}
