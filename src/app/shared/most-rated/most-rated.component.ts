import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-most-rated',
  templateUrl: './most-rated.component.html',
  styleUrls: ['./most-rated.component.scss']
})
export class MostRatedComponent implements OnInit {

  rankedItens: [] | any;
  isLogged: boolean;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.utilService.isLogged();
    this.mostRatedItems();
    this.subscribeToIsLoggedSubject();
  }

  subscribeToIsLoggedSubject() {
    this.utilService.isLoggedSubject
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      });
  }


  mostRatedItems() {
    this.apiService.getRankedItems(3, 'desc').pipe(take(1)).subscribe({
      next: v => {
        this.rankedItens = v;
      }
    })
  }

}
