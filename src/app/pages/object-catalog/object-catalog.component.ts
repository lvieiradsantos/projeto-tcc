import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-object-catalog',
  templateUrl: './object-catalog.component.html',
  styleUrls: ['./object-catalog.component.scss']
})
export class ObjectCatalogComponent implements OnInit {



  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }


  getCatalogue() {
    this.apiService.getItens().subscribe(() => {

    })
  }

}
