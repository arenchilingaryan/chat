import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router
  ) {
  }

  status = false;

  ngOnInit() {
    const localStatus = localStorage.getItem('status');
    this.status = JSON.parse(localStatus)
    if (this.status === true) {
      this.status = true;
      this.router.navigate(['chat']);
    } else {
      this.status = false;
      this.router.navigate(['auth']);
    }
  }
}
