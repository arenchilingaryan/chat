import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  {

  @Input() status

  name = ''

  onSubmit(form) {
    form.value.input !== undefined && form.value.input !== '' ?
      localStorage.setItem('nickName', `${form.value.input}`) :
      alert('Вы посмотрите какой он умный');
    this.status = true;
    this.name = '';
  }
}
