import { Component, OnInit } from '@angular/core';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged: boolean;

  constructor(
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.getUrl();
    this.setIsLogged();
    this.subscribeToIsLoggedSubject();
  }

  subscribeToIsLoggedSubject() {
    this.utilService.isLoggedSubject
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      });
  }

  setIsLogged() {
    this.isLogged = this.utilService.isLogged();
  }

  getUrl() {
    return (window.location.pathname == '/login' || window.location.pathname == '/cadastro');
  }

  getFaleConosco() {
    return window.location.pathname == '/fale-conosco';
  }

}
