import {OnChanges, Component, Input} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges {
  constructor() {
  }

  @Input() status;
  @Input() nickName;

  messages = [];

  value = '';

  editValue = '';

  id = 0;

  idItem = null;


  ngOnChanges(): void {
    const messagesData = localStorage.getItem('messages');
    const data = JSON.parse(messagesData);
    this.messages = data;
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
      name: this.nickName,
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
    this.nickName = null;
  }

}
