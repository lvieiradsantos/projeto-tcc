import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isLogged: boolean;

  constructor(
    private router: Router,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.isLogged = !!this.utilService.getToken();
    this.utilService.isLoggedSubject
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      });
  }

  logout() {
    this.utilService.logout();
  }
}


