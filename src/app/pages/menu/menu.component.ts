import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  token: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  logout() {
    this.token = localStorage.removeItem('token');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    })
  }
}


