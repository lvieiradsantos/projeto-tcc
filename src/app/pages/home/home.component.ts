import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: string;
  userId: any;
  tokenDecripted: any;
  userType: string;
  pendingItens: any;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.userId = localStorage.getItem('userId');
      this.getUserType();
      this.getPendingItens();
    }
  }



  getUserType() {
    this.apiService.getUsuario(this.userId).pipe(take(1)).subscribe(userInfo => {
      this.userType = userInfo.type;
      return this.userType;
    })
  }

  getPendingItens() {
    this.apiService.getUsuario(this.userId).pipe(take(1)).subscribe(userInfo => {
      this.userType = userInfo.type;

      if (this.userType == 'admin') {
        this.apiService.getItensPendentes().pipe(take(1)).subscribe({
          next: pendingItens => {
            this.pendingItens = pendingItens.items;
            return this.pendingItens;
          }
        })
      }
    })
  }



  checkPendingItens() {
    if (this.pendingItens) {
      if (this.pendingItens.length > 0) {
        return true;
      } else {
        return false;
      }
    } else{
      return false;
    }
  }


}
