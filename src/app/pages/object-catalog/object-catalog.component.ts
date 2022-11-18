import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { faPenToSquare, faTrashCan, faHeart } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UtilService } from 'src/app/services/util.service';
import { ProfileModel } from 'src/app/model/profile.model';

@Component({
  selector: 'app-object-catalog',
  templateUrl: './object-catalog.component.html',
  styleUrls: ['./object-catalog.component.scss']
})
export class ObjectCatalogComponent implements OnInit {

  catalogItems: any;
  catalogMeta: any;
  filterCatalog: FormGroup;
  filteredWord: string;
  isLogged: boolean;
  pageNumber = 1;
  user: ProfileModel;
  userFavItemsId: [] | any;

  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faHeart = faHeart;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.utilService.isLogged();
    this.getUser();
    this.paginatedItems();
    this.filterCatalog = this.formBuilder.group({
      searchInput: ['']
    });
    this.filterCatalogItems();
    this.getUserFavItems();
    this.subscribeToIsLoggedSubject();
  }

  subscribeToIsLoggedSubject() {
    this.utilService.isLoggedSubject
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      });
  }

  beforePage() {
    this.pageNumber--;
    const { searchInput } = this.filterCatalog.controls;
    if (searchInput.value == '') {
      this.paginatedItems();
    } else {
      this.apiService.getItensPaginado(this.pageNumber, 8, searchInput.value?.toLowerCase()).subscribe({
        next: pagination => {
          this.catalogItems = pagination.items;
          this.catalogMeta = pagination.meta;
        }
      });
    }
  }

  afterPage() {
    this.pageNumber++;
    const { searchInput } = this.filterCatalog.controls;
    if (searchInput.value == '') {
      this.paginatedItems();
    } else {
      this.apiService.getItensPaginado(this.pageNumber, 8, searchInput.value?.toLowerCase()).subscribe({
        next: pagination => {
          this.catalogItems = pagination.items;
          this.catalogMeta = pagination.meta;
        }
      });
    }
  }

  paginatedItems() {
    this.apiService.getItensPaginado(this.pageNumber, 8).pipe(take(1)).subscribe({
      next: pagination => {
        this.catalogItems = pagination.items;
        this.catalogMeta = pagination.meta;
      }
    });
  }

  filterCatalogItems() {
    const { searchInput } = this.filterCatalog.controls;

    searchInput.valueChanges.pipe(debounceTime(1000)).subscribe((word: string) => {
      this.apiService.getItensPaginado(this.pageNumber, 8, word?.toLowerCase()).subscribe({
        next: pagination => {
          this.catalogItems = pagination.items;
          this.catalogMeta = pagination.meta;
        }
      });
    });
  }

  getUser() {
    this.user = this.utilService.getDecodedUser();
  }

  getUserFavItems() {
    if (this.isLogged) {
      this.apiService.getUsuario(this.user.id).pipe(take(1)).subscribe({
        next: v => {
          return this.userFavItemsId = v.favItems;
        }
      })
    }
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
        this.getUserFavItems();
      }
    })
  }

  unfavoriteItem(itemId) {
    this.apiService.removeFavouriteItem(itemId, this.user.id).pipe(take(1)).subscribe({
      next: v => {
        this.getUserFavItems();
      }
    })
  }

}
