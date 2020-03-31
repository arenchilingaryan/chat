import {Component, DoCheck} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  constructor() {
  }

  nickName: string = '';

  status: boolean = false;


  ngDoCheck() {
    this.nickName = localStorage.getItem('nickName');
    if (this.nickName !== null) {
      this.status = true;
    } else {
      this.status = false;
    }
  }

}
