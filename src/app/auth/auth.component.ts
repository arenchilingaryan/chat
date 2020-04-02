import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(
    private router: Router
  ) {
  }

  @Input() status;

  name = '';

  onSubmit(form) {
    if (form.value.input !== undefined && form.value.input !== '') {
      localStorage.setItem('nickName', `${form.value.input}`);
      localStorage.setItem('status', `true`);
      this.router.navigate(['/chat']);
      this.status = true;
    } else {
      alert('Вы посмотрите какой умный');
    }
  }
}
