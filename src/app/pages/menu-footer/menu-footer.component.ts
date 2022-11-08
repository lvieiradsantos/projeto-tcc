import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.scss']
})
export class MenuFooterComponent implements OnInit {

  token: any;
  constructor() { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

}
