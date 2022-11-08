import { Component, OnInit } from '@angular/core';
import { CatalogModel } from 'src/app/model/catalog.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-object-catalog',
  templateUrl: './object-catalog.component.html',
  styleUrls: ['./object-catalog.component.scss']
})
export class ObjectCatalogComponent implements OnInit {

  items: any;
  catalogItems: CatalogModel | any;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getCatalogue();
  }


  getCatalogue() {
    this.apiService.getItens().subscribe((items) => {
      this.catalogItems = items;
    })
  }

}
