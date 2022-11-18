import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ProfileModel } from 'src/app/model/profile.model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-object-catalog-pending',
  templateUrl: './object-catalog-pending.component.html',
  styleUrls: ['./object-catalog-pending.component.scss']
})
export class ObjectCatalogPendingComponent implements OnInit {

  catalogPendingItems: any;
  catalogPendingMeta: any;
  filterPendingCatalog: FormGroup;
  filteredWord: string;
  isLogged: boolean;
  pageNumber = 1;
  user: ProfileModel;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.utilService.isLogged();
    this.getUser();
    this.paginatedPendingItems();
    this.filterPendingCatalog = this.formBuilder.group({
      searchInput: ['']
    });

    this.filterPendingCatalogItems()
  }

  getUser() {
    this.user = this.utilService.getDecodedUser();
  }

  beforePage() {
    this.pageNumber--;
    const { searchInput } = this.filterPendingCatalog.controls;
    if (searchInput.value == '') {
      this.paginatedPendingItems();
    } else {
      this.apiService.getPendingItensPaginado(this.pageNumber, 8, searchInput.value?.toLowerCase()).subscribe({
        next: catalog => {
          this.catalogPendingItems = catalog.items;
          this.catalogPendingMeta = catalog.meta;
        }
      });
    }
  }

  afterPage() {
    this.pageNumber++;
    const { searchInput } = this.filterPendingCatalog.controls;
    if (searchInput.value == '') {
      this.paginatedPendingItems();
    } else {
      this.apiService.getPendingItensPaginado(this.pageNumber, 8, searchInput.value?.toLowerCase()).subscribe({
        next: catalog => {
          this.catalogPendingItems = catalog.items;
          this.catalogPendingMeta = catalog.meta;
        }
      });
    }
  }

  paginatedPendingItems() {
    this.apiService.getPendingItensPaginado(this.pageNumber, 8).pipe(take(1)).subscribe({
      next: catalog => {
        this.catalogPendingItems = catalog.items;
        this.catalogPendingMeta = catalog.meta;
      }
    });
  }

  filterPendingCatalogItems() {
    const { searchInput } = this.filterPendingCatalog.controls;
    searchInput.valueChanges.pipe(debounceTime(1000)).subscribe((word: string) => {
      this.apiService.getPendingItensPaginado(this.pageNumber, 8, word?.toLowerCase()).subscribe({
        next: catalog => {
          this.catalogPendingItems = catalog.items;
          this.catalogPendingMeta = catalog.meta;
        }
      });
    });
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

  refeshItemList() {
    this.paginatedPendingItems();
  }

}
