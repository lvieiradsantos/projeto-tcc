import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs';
import { CatalogItemModel } from 'src/app/model/catalog-item.model';
import { ApiService } from 'src/app/services/api.service';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-object-catalog',
  templateUrl: './object-catalog.component.html',
  styleUrls: ['./object-catalog.component.scss']
})
export class ObjectCatalogComponent implements OnInit, OnChanges {

  catalogItems: any;
  catalogMeta: any;
  filterCatalog: FormGroup;
  filteredWord: string;
  token: string;
  pageNumber = 1;

  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.paginatedItems();
    this.filterCatalog = this.formBuilder.group({
      searchInput: ['']
    })
    this.filterCatalogItems();
  }

  ngOnChanges() {
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
      })
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
      })
    }

  }

  paginatedItems() {
    this.apiService.getItensPaginado(this.pageNumber, 8).pipe(take(1)).subscribe({
      next: pagination => {
        this.catalogItems = pagination.items;
        this.catalogMeta = pagination.meta;
      }
    })
  }




  filterCatalogItems() {
    const { searchInput } = this.filterCatalog.controls;

    searchInput.valueChanges.pipe(debounceTime(1000)).subscribe((word: string) => {
      this.apiService.getItensPaginado(this.pageNumber, 8, word?.toLowerCase()).subscribe({
        next: pagination => {
          this.catalogItems = pagination.items;
          this.catalogMeta = pagination.meta;
        }
      })
    })
  }

}
