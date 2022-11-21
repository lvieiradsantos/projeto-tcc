import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { take } from 'rxjs';
import { CatalogItemModel } from 'src/app/model/catalog-item.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-object-catalog-edit',
  templateUrl: './object-catalog-edit.component.html',
  styleUrls: ['./object-catalog-edit.component.scss']
})
export class ObjectCatalogEditComponent implements OnInit {

  faPenToSquare = faPenToSquare;

  itemId: string;
  itemDetails: CatalogItemModel;
  updateItem: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getItemId();
    this.getItemDetail();
  }

  getItemId() {
    this.activatedRoute.params.subscribe({
      next: v => {
        return this.itemId = (v['id'])
      }
    })
  }

  getItemDetail() {
    this.apiService.getItem(this.itemId).pipe(take(1)).subscribe({
      next: item => {
        this.itemDetails = item;

        if (this.itemDetails) {
          this.updateItem = this.formBuilder.group({
            name: [this.itemDetails.name, [Validators.required]],
            model: [this.itemDetails.model, [Validators.required]],
            brand: [this.itemDetails.brand, [Validators.required]],
            watts: [this.itemDetails.watts, [Validators.required]],
            db: [this.itemDetails?.db],
            file: [this.itemDetails?.file],
            rate: [this.itemDetails.rate, [Validators.required]],
          })
        }
      }
    })
  }

  sendUpdateItem() {
    let { name, model, brand, watts, db, rate, file } = this.updateItem.value;

    const item = { name, model, brand, db: +db, watts:+watts, rate, file };

    this.apiService.editItem(this.itemId, item).subscribe({
      next: (v) => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Novo item cadastrado com sucesso',
          icon: 'success',
          confirmButtonText: 'Fechar'
        }).then(() => {
          this.router.navigate([`/item/${this.itemId}`])
        })
      }
    })
  }


}


