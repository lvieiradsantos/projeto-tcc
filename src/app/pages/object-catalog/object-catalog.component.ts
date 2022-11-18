import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { faPenToSquare, faTrashCan, faHeart } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';

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
  token: string;
  pageNumber = 1;
  user: any;
  userFavItemsId: [] | any;

  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faHeart = faHeart;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.getUser();
    this.paginatedItems();
    this.filterCatalog = this.formBuilder.group({
      searchInput: ['']
    });
    this.filterCatalogItems();
    this.getUserFavItems();
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
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.user = jwt_decode(this.token);
      return this.user;
    }
  }

  getUserFavItems() {
    if (this.token) {
      this.apiService.getUsuario(this.user.id).pipe(take(1)).subscribe({
        next: v => {
          console.log(v)
          return this.userFavItemsId = v.favItems;
        }
      })
    }
  }

  checkIfItemFavorite(itemId) {
    return !!this.userFavItemsId.find(item => item.id === itemId);
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
        window.location.reload();

      }
    })
  }
  
  unfavoriteItem(itemId) {
    this.apiService.removeFavouriteItem(itemId, this.user.id).pipe(take(1)).subscribe({
      next: v => {
        window.location.reload();
      }
    })
  }

}
