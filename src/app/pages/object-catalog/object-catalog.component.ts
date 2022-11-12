import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs';
import { CatalogItemModel } from 'src/app/model/catalog-item.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-object-catalog',
  templateUrl: './object-catalog.component.html',
  styleUrls: ['./object-catalog.component.scss']
})
export class ObjectCatalogComponent implements OnInit, OnChanges {

  catalogItems: any;
  catalogLinks: any;
  catalogMeta: any;
  filterCatalog: FormGroup;
  filteredWord: string;
  token: string;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    // this.apiService.getItens().subscribe((items) => {
    //   this.catalogItems = items;
    //   console.log(this.catalogItems)
    // })
    this.paginatedItems();
    this.filterCatalog = this.formBuilder.group({
      searchInput: ['']
    })

    this.filterCatalogItems();
  }

  ngOnChanges() {
  }

  paginatedItems() {
    this.apiService.getItensPaginado(1, 8).pipe(take(1)).subscribe({
      next: pagination => {
        this.catalogItems = pagination.items;
        this.catalogLinks = pagination.links;
        this.catalogMeta = pagination.meta;
        console.log(this.catalogItems);
        console.log(this.catalogLinks);
        console.log(this.catalogMeta);
      }
    })
  }

  filterCatalogItems() {
    const { searchInput } = this.filterCatalog.controls;

    searchInput.valueChanges.pipe(debounceTime(1000)).subscribe((word: string) => {
      this.apiService.getItens(word.toLowerCase()).subscribe((items) => {
        this.catalogItems = items;
      })
    })
  }

}
