import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CatalogItemModel } from 'src/app/model/catalog-item.model';
import { ProfileModel } from 'src/app/model/profile.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLogged: boolean;
  tokenDecripted: any;
  user: ProfileModel;
  pendingItens: CatalogItemModel[];

  faTriangleExclamation = faTriangleExclamation;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.utilService.isLogged();
    this.getUser();
    this.subscribeToIsLoggedSubject();
  }

  subscribeToIsLoggedSubject() {
    this.utilService.isLoggedSubject
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      });
  }

  getUser() {
    this.user = this.utilService.getDecodedUser();
    if (this.user) {
      this.getPendingItens();
    }
  }

  getPendingItens() {
    this.apiService.getUsuario(this.user?.id).pipe(take(1)).subscribe(userInfo => {
      if (this.user.type == 'admin') {
        this.apiService.getItensPendentes().pipe(take(1)).subscribe({
          next: pendingItens => {
            this.pendingItens = pendingItens.items;
          }
        })
      }
    })
  }

  hasPendingItens() {
    return this.pendingItens?.length > 0;
  }
}
