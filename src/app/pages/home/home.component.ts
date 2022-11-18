import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: boolean;
  userId: any;
  tokenDecripted: any;
  userType: string;
  pendingItens: any;
  user: any;


  constructor(
    private router: Router,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.token = this.utilService.isLogged();
    this.user = this.utilService.getUserDecoded();
    this.userType = this.utilService.getUserDecoded().type;
    this.getPendingItens();
  }



  getPendingItens() {
    this.apiService.getUsuario(this.user.id).pipe(take(1)).subscribe(userInfo => {
      this.userType = userInfo.type;

      if (this.userType == 'admin') {
        this.apiService.getItensPendentes().pipe(take(1)).subscribe({
          next: pendingItens => {
            this.pendingItens = pendingItens.items;
          }
        })
      }
    })
  }



  checkPendingItens() {
    return this.pendingItens?.length > 0;
  }


}
