import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faUserGroup, faHandsAslInterpreting, faStar, faHandshake, faEquals , faHandHoldingHeart, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  faHeart = faHeart;
  faUserGroup = faUserGroup;
  faHandsAslInterpreting = faHandsAslInterpreting;
  faStar = faStar;
  faHandshake = faHandshake;
  faEquals = faEquals;
  faHandHoldingHeart = faHandHoldingHeart;
  faUsersRectangle = faUsersRectangle;

  constructor(
    private router: Router)
  {}

  ngOnInit(): void {
  }
}
