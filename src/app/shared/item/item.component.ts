import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs';
import { CatalogItemModel } from 'src/app/model/catalog-item.model';
import { ProfileModel } from 'src/app/model/profile.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
import { faPenToSquare, faTrashCan, faHeart, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faHeart = faHeart;
  faSquareCheck = faSquareCheck;

  @Input() item: CatalogItemModel;
  @Input() user: ProfileModel;
  @Output() shouldRefresh = new EventEmitter();
  @Input() userFavItemsId: [] | any;
  isLogged: boolean;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.utilService.isLogged();
    this.subscribeToIsLoggedSubject();
  }

  subscribeToIsLoggedSubject() {
    this.utilService.isLoggedSubject
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      });
  }

  checkIfItemFavorite(itemId) {
    return !!this.userFavItemsId?.find(item => item.id === itemId);
  }

  deleteItem(itemId) {
    Swal.fire({
      title: 'Você realmente deseja deletar este item?',
      text: "Os dados do item serão apagados do nosso sistema.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar agora!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteItem(itemId).subscribe({
          next: v => {
            Swal.fire(
              'Item deletado com sucesso!',
            ).then(() => {
              window.location.reload();
            }
            );
          }
        });
      }
    });
  }

  favoriteItem(itemId) {
    this.apiService.addFavouriteItem(itemId, this.user.id).pipe(take(1)).subscribe({
      next: v => {
        this.shouldRefresh.emit();
      }
    })
  }

  unfavoriteItem(itemId) {
    this.apiService.removeFavouriteItem(itemId, this.user.id).pipe(take(1)).subscribe({
      next: v => {
        this.shouldRefresh.emit();
      }
    })
  }

  acceptItem(itemId) {
    Swal.fire({
      title: 'Você realmente deseja aprovar este item?',
      text: `Os dados do item serão exibidos no catalogo.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, aprovar agora!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.editItem(itemId, { active: true }).subscribe({
          next: v => {

            Swal.fire(
              'Item aprovado com sucesso!',
            ).then(() => {
              window.location.reload();
            }
            );
          }
        });
      }
    });
  }

}
