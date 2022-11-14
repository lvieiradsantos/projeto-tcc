import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faUserGroup, faHandsAslInterpreting, faStar, faHandshake, faEquals, faHandHoldingHeart, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';


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
  totalItens: number;




  constructor(
    private router: Router,
    private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getTotalItemsCadastrados();
  }


  getTotalItemsCadastrados() {
    this.apiService.getItens().pipe(take(1)).subscribe({
      next: v => {
        this.totalItens = v.length;
      }
    })
  }
}

