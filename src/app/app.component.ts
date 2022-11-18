import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'projeto-tcc';
  token: any;
  tokenDecripted: any;
  userId: any;

  constructor(
  ) { }

  ngOnInit() {
    this.getUrl();
    this.getUserId();
  }

  getUserId() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokenDecripted = jwt_decode(this.token);
      this.userId = this.tokenDecripted.id;
      localStorage.setItem('userId', this.userId);
    }
  }

  getUrl() {
    if (window.location.pathname == '/login' || window.location.pathname == '/cadastro') {
      return true;
    } else {
      return false;
    }
  }

  getFaleConosco() {
    return window.location.pathname == '/fale-conosco';
  }

}
