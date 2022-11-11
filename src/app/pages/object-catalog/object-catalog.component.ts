import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CatalogItemModel } from 'src/app/model/catalog-item.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-object-catalog',
  templateUrl: './object-catalog.component.html',
  styleUrls: ['./object-catalog.component.scss']
})
export class ObjectCatalogComponent implements OnInit, OnChanges {

  catalogItems: CatalogItemModel[];
  filterCatalog: FormGroup;
  filteredWord: string;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.apiService.getItens().subscribe((items) => {
      this.catalogItems = items;
      console.log(this.catalogItems)
    })
    this.filterCatalog = this.formBuilder.group({
      searchInput: ['']
    })

    this.filterCatalogItems();
  }

  ngOnChanges() {
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
