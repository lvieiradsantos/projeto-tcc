import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faUsers, faHandsAslInterpreting } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  faHeart = faHeart;
  faUsers = faUsers;
  faHandsAslInterpreting = faHandsAslInterpreting;

  constructor(
    private router: Router)
  {}

  ngOnInit(): void {
  }
}
