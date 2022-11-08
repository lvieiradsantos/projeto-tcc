import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
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


  ngOnInit() {
    this.getUserId();
  }

  getUserId() {
    this.token = localStorage.getItem('token');
    this.tokenDecripted = jwt_decode(this.token);
    this.userId = this.tokenDecripted.id;
    localStorage.setItem('userId', this.userId);
  }
}

