import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ProfileModel } from 'src/app/model/profile.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-favorite-objects-catalog',
  templateUrl: './favorite-objects-catalog.component.html',
  styleUrls: ['./favorite-objects-catalog.component.scss']
})
export class FavoriteObjectsCatalogComponent implements OnInit {

  userFavItemsId: [] | any;
  user: ProfileModel;
  isLogged: boolean;

  constructor(
    private utilService: UtilService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserFavItems();
  }

  getUser() {
    this.user = this.utilService.getDecodedUser();
  }

  getUserFavItems() {
    this.apiService.getUsuario(this.user.id).pipe(take(1)).subscribe({
      next: v => {
        this.userFavItemsId = v.favItems;
        console.log(this.userFavItemsId)
        return this.userFavItemsId;
      }
    })
  }

  refeshItemList() {
    this.getUserFavItems();
  }


}
