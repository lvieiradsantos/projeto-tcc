import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { faBookmark, faRankingStar, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-most-rated',
  templateUrl: './most-rated.component.html',
  styleUrls: ['./most-rated.component.scss']
})
export class MostRatedComponent implements OnInit {

  rankedItens: [] | any;
  isLogged: boolean;
  
  faBookmark = faBookmark;
  faRankingStar = faRankingStar;
  faCircleQuestion = faCircleQuestion;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.utilService.isLogged();
    this.getMostRatedItems();
    this.subscribeToIsLoggedSubject();
  }

  subscribeToIsLoggedSubject() {
    this.utilService.isLoggedSubject
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      });
  }


  getMostRatedItems() {
    this.apiService.getRankedItems(3, 'desc').pipe(take(1)).subscribe({
      next: v => {
        this.rankedItens = v;
      }
    })
  }
}
